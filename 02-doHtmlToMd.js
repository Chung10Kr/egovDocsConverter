import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs/promises'; // 파일 시스템 모듈 (Promise 기반)
import TurndownService from 'turndown'
import turndownPluginGfm from 'turndown-plugin-gfm'
import path from 'path';
import { URL } from 'url';
import {
    TARGET_DIR
  } from "./properties.js";
import {
    FILE_NAME,
    SAVE_DIR,
    HTML_URL,
    DESCRIPTION
  } from "./target.js";

// Front Template 
const FRONT_MATTER = `---
  title: ${HTML_URL.split(":").reverse()[0]}
  linkTitle: ${HTML_URL.split(":").reverse()[0]}
  description: "${DESCRIPTION}"
  url: ${SAVE_DIR}/${FILE_NAME}
  menu:
    depth:
      weight: ${SAVE_DIR.split("/").length-1 }
      parent: ${SAVE_DIR.split("/").reverse()[0]}
      identifier: ${FILE_NAME}
  ---
  
  `;


// 주어진 URL에서 HTML을 가져옴
async function fetchHtml(url) {
    try {
        const response = await fetch(url);           
        const data = await response.text();          // 응답을 텍스트(HTML)로 변환
        return data;                                 
    } catch (error) {
        console.error('Error fetching the URL:', error);
        return null;
    }
}

// Content를 .md로 저장
async function saveMarkdownToFile(filePath, content) {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
  
      let fileExists = false;
      try {
        await fs.access(filePath);
        fileExists = true;
      } catch (_) {
        fileExists = false;
      }
  
      if (fileExists) {
        const appendContent = `\n\n${content}`;
        await fs.appendFile(filePath, appendContent, 'utf8');
      } else {
        await fs.writeFile(filePath, `${FRONT_MATTER}${content}`, 'utf8');
      }
  
      console.log(`Markdown has been saved to ${filePath}`);
    } catch (error) {
      console.error('Error saving the Markdown file:', error);
    }
  }

// 특정 클래스명 영역만 추출하는 함수
function extractContentByClass(htmlString, className) {
    const $ = cheerio.load(htmlString);
    return $(`.${className}`).html(); // 특정 클래스명을 가진 영역의 HTML을 반환
}

// 특정 클래스명 영역만 제거하는 함수
function removeElementsByClass(htmlString, classToRemove) {
    const $ = cheerio.load(htmlString);
    
    // 'toggle' 클래스를 가진 모든 요소를 제거
    $(`.${classToRemove}`).remove();
    
    return $.html(); // 제거된 후의 HTML을 반환
}

// 이미지 다운로드 함수
async function downloadImage(url, filePath) {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
  
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);
  
      console.log(`Downloaded and saved: ${filePath}`);
    } catch (error) {
      console.error(`Error downloading image from ${url}`, error);
    }
  }

function createAnchor(text) {
    return text
        .toLowerCase()                             // 1. 소문자로 변환
        .replace(/\s+/g, '-')                      // 2. 공백을 하이픈으로 변환
        .replace(/[^\w\-가-힣]/g, '')              // 3. 알파벳, 숫자, 하이픈, 한글을 제외한 모든 문자 제거
        .replace(/\-+/g, '-');                     // 4. 연속된 하이픈을 하나의 하이픈으로 변환
}

// HTML을 Markdown으로 변환하는 함수
function convertHtmlToMarkdown(htmlString) {

    // https://github.com/mixmark-io/turndown
    var turndownService = new TurndownService({
        preformattedCode : true
    })
    var gfm = turndownPluginGfm.gfm
    var tables = turndownPluginGfm.tables
    var strikethrough = turndownPluginGfm.strikethrough
    
    // Use the gfm plugin
    turndownService.use(gfm)
    
    // Use the table and strikethrough plugins only
    turndownService.use([tables, strikethrough])

    var rule = {
        "h1" : function (content) { return `# ${content}` },
        "h2" : function (content) { return `## ${content}` },
        "h3" : function (content) { return `### ${content}` },
        "h4" : function (content) { return `#### ${content}` },
        "h5" : function (content) { return `##### ${content}` },
        "h6" : function (content) { return `###### ${content}` },
        "h7" : function (content) { return `####### ${content}` },
        "h8" : function (content) { return `######## ${content}` },
        "h9" : function (content) { return `######### ${content}` },
        "h10" : function (content) { return`########## ${content}` },
        "h11" : function (content) { return`########### ${content}` },
        'pre'  : function (content,node,option) { 
            const className = node.getAttribute('class') || ''; 
            if( className.includes('code') ){
                content = content.replace(/\\/g, '');
                if( content.charAt(0) == "<"){
                    return "\n\n```xml\n"+content+"\n```"     
                }
                if( content.charAt(0) == "p"){
                    return "\n\n```java\n"+content+"\n```"     
                }
                return "\n\n```bash\n"+content+"\n```"     
            }
            return content
        },
        'p' : function(content){
            return `\n\n ${
                content.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/`/g, "'")
            
            }`;
            //return content
        },
        'img' : function(content, node) {
            const src = node.getAttribute('src');
            const alt = node.getAttribute('alt') || 'image';

            const urlObject = new URL(`https://www.egovframe.go.kr${src}`);
            const mediaParam = urlObject.searchParams.get('media');

            let fileName = mediaParam ? path.basename(mediaParam) : path.basename(urlObject.pathname);
            let _tmp = fileName.split(":").reverse();
            if(_tmp.length > 1){
                fileName = `${_tmp[1]}-${_tmp[0]}`    
            }
            
            downloadImage(
                `https://www.egovframe.go.kr${src}`,
                `${TARGET_DIR}/${SAVE_DIR}/images/${fileName}`
            );
            return `![${alt}](./images/${fileName})`;
        },
        'a' : function(content,node,option){
            if( content.charAt(0) == "!" ){
                return content;
            }
            
            let arr = [
                "String","Long","Integer","Object","Date","Exception",
                "Environment","URL","Cache","Element","File"
            ]
            if( arr.some( str => str == content) ){
                return content
            }
            
            const href = node.getAttribute('href')
            if( !href ){
                return content.replaceAll('\\' , '');
            }

            if( href.charAt(0) == '#' ){
                return `[${node.textContent}](#${createAnchor( content )})`
            }
            
            if( href.indexOf("http") != -1){
                return `[${node.textContent}](${node.getAttribute('href')})`    
            }

            return `[${node.textContent}](https://www.egovframe.go.kr${node.getAttribute('href')})`
        },
        'em' : function(content){
            return `***${content}*** `;
        },
        'code' : function(content){
            return content;
        },
        'li' : function(content){
            return `- ${content.trim()}\n`
        }
    }

    Object.keys(rule).forEach(key => {
        turndownService.addRule('strikethrough', {
            filter: [key],
            replacement: rule[key]
        })
    })


    return turndownService.turndown(htmlString)
}

// 함수 호출 및 변수에 담기
(async () => {
    const htmlData = await fetchHtml(HTML_URL);

    if (!htmlData) {
        console.log("HTML DATA Not Found");
        return false;
    }

    let pageContent = extractContentByClass(htmlData, 'page'); // 'page' 클래스 부분만 추출
    pageContent = removeElementsByClass(pageContent, 'toc'); // 'toc' 클래스 부분만 제거

    const markdown = convertHtmlToMarkdown(pageContent); // HTML을 Markdown으로 변환
    
    await saveMarkdownToFile(`${TARGET_DIR}/${SAVE_DIR}/${FILE_NAME}.md`, `\n\n${markdown}`); // Markdown 파일로 저장
})();