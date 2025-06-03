export const SAVE_DIR = "common-component/user-authentication";

export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v4.3:uat:로그인정책관리"
export const FILE_NAME = "access-policy"
export const DESCRIPTION = "로그인정책관리는 특정 IP에 대한 로그인 제한과 같은 사용자 로그인 정책을 정의하고, 정의된 정책에 맞게 로그인을 제한하는 기능을 제공한다."


function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;

