export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v4.3:sec:부서권한관리"
export const SAVE_DIR = "common-component/security";
export const FILE_NAME = "department-role-management";
export const DESCRIPTION = "부서권한관리는 시스템 사용을 위해 사용자에게 권한을 부여할 경우 사용자가 업무담당자에 한해서 부서별로 사용자에게 일괄 권한을 부여하는 기능을 제공한다.";
export const WEIGHT = 5;
export const PARENT = "security";


function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;

