export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v4.3:sec:그룹관리"
export const SAVE_DIR = "common-component/security";
export const FILE_NAME = "group-management";
export const DESCRIPTION = "그룹관리는 시스템을 사용하는 목적별 사용자 그룹을 생성하여 그룹에 해당하는 사용자에게 권한을 일괄적으로 할당하기 위해 그룹을 정의한다.";
export const WEIGHT = 3;
export const PARENT = "security";


function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;
