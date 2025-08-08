export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v3:cmm:showmodaldialog"
export const SAVE_DIR = "common-component/elementary-technology";
export const FILE_NAME = "showmodaldialog";
export const DESCRIPTION = "다국어 지원을 위한 국가간 날짜 표시 변환 기능을 제공한다.";
export const WEIGHT = 5;
export const PARENT = "new-components-v3.2";


function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;

