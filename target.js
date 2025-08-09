export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:cop:웹소켓메신저"
export const SAVE_DIR = "common-component/elementary-technology";
export const FILE_NAME = "websocket_messenger";
export const DESCRIPTION = "웹소켓 메신저는 HTML5 WebSocket와 Java Websocket을 이용하여 메신저 기능을 제공한다.";
export const WEIGHT = 4;
export const PARENT = "external-components";


function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;

