export const SAVE_DIR = "common-component/user-authentication";

export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v4.3:uat:인증서로그인"
export const FILE_NAME = "certificate-login"
export const DESCRIPTION = "인증서로그인은 기존 GPKI 인증서 로그인과 동일한 기능을 제공한다."


function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;

