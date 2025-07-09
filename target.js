export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v4.3:sts:사용자통계"
export const SAVE_DIR = "common-component/statistics-reporting";
export const FILE_NAME = "user_statistics";
export const DESCRIPTION = "사용자통계 기능은 각종 사용자 현황에 대한 통계자료를 회원유형, 회원상태, 성별에 따라 기간별(연도별, 월별, 일별)로 그래프와 텍스트 형태 두가지 방식으로 제공한다.";
export const WEIGHT = 2;
export const PARENT = "statistics-reporting";


function setBranch(HTML_URL){
    let arr = HTML_URL.split( ":" )
    arr = arr.reverse().filter(x=>x)
    return `${arr[0].replaceAll("_","-")}`
}

export const BRANCH_NAME =  `${setBranch( HTML_URL )}`;

