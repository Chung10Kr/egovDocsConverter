export const SAVE_DIR = "common-component/user-authentication";

export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v2:uat:sso연계_서비스"
export const FILE_NAME = "sso_service"
export const DESCRIPTION = "SSO 연계 서비스는 독립된 사이트간의 인증 공유를 위해 3rd party SSO 솔루션을 활용할 수 있는 인터페이스를 제공한다."
export const WEIGHT = 1;
export const PARENT = "login";
        

function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;

