# eGovFrame HTML → Markdown 변환 자동화

이 프로젝트는 eGovFrame 공식 위키 문서(HTML)를 Markdown 형식으로 변환하고, 포크된 저장소에 커밋 후 원본 저장소에 Pull Request(PR)를 생성하는 자동화 도구입니다.

---

## 📂 디렉토리 

```bash
├── 01-setBranch.js        # URL 기준 브랜치명 생성
├── 02-doHtmlToMd.js       # HTML → Markdown 변환 및 저장
├── 03-setPR.js            # Git 커밋/푸시 및 PR 생성
├── target.js              # 가이드 대상 설정 (URL, 파일명, 설명 등)
├── properties.js          # GitHub 및 레포지토리 관련 설정
└── README.md              # 사용 설명서
```


---

## ⚙️ 1. 사전 설정

### properties.js

```js
export const TARGET_DIR = "/Users/crlee/dev/crlee/project/egovframe-docs";
export const TOKEN = "**************";
export const UP_STREAM_REPO_OWNER = "eGovFramework";
export const UP_STREAM_REPO_NAME = "egovframe-docs";
export const UP_BRANCH_OWNER = "main";
export const BRANCH_OWNER = "contribution";
export const REPO_OWNER = "Chung10Kr";
```

## 2. npm install
```bash
npm install
```

## 3. 사용방법

### 3.1. 타켓 설정
- target.js에서 대상이 되는 가이드, 저장 위치, 파일명, 설명등을 작성한다.
```js
export const SAVE_DIR = "common-component/user-authentication";
export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v4.3:uat:인증서로그인";
export const FILE_NAME = "certificate-login";
export const DESCRIPTION = "인증서로그인은 기존 GPKI 인증서 로그인과 동일한 기능을 제공한다.";

function setBranch(HTML_URL) {
  let arr = HTML_URL.split(":").reverse().filter(x => x);
  return `${arr[0].replaceAll("_", "-")}`;
}

export const BRANCH_NAME = `${setBranch(HTML_URL)}`;
```

### 3.2. 브랜치 설정
```bash
node 01-setBranch.js
```

### 3.3. HTML -> Markdown 변환
- 변환 후 **검수** 필수
```bash
node 02-doHtmlToMd.js
```

### 3.4. PR 생성
- PR 이후 [egovframe-docs](https://github.com/eGovFramework/egovframe-docs/pulls)에서 정상적으로 PR 완료 확인 필요
```bash
node 03-setPR.js
```