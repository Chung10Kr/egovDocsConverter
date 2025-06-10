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
// Markdown 파일이 저장될 로컬 디렉토리 경로
export const TARGET_DIR = "/Users/crlee/dev/crlee/project/egovframe-docs";
// GitHub 인증 토큰 (개인 액세스 토큰 사용) - 중요! 실제 배포시에는 노출 주의
export const TOKEN = "**************";
// 오픈소스 원본 레포지토리의 소유자 (ex: eGovFramework)
export const UP_STREAM_REPO_OWNER = "eGovFramework";
// 오픈소스 원본 레포지토리의 이름
export const UP_STREAM_REPO_NAME = "egovframe-docs";
// 원본 레포지토리의 기본 브랜치 이름 (보통 'main')
export const UP_BRANCH_OWNER = "main";
// 내 포크된 레포지토리에서 작업할 브랜치의 기준 브랜치 (보통 'contribution' 또는 'main')
export const BRANCH_OWNER = "contribution";
// 내 GitHub 사용자 이름 (Pull Request 생성 시 사용됨)
export const REPO_OWNER = "Chung10Kr";
```

## ⚙️ 2. npm install
```bash
npm install
```

## ⚙️ 3. 실행 방법

### 3.1. 타켓 설정
- target.js에서 대상이 되는 가이드, 저장 위치, 파일명, 설명등을 작성한다.
```js
export const SAVE_DIR = "common-component/user-authentication"; // docs하위 저장 위치
export const HTML_URL = "https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:com:v4.3:uat:인증서로그인"; // 복사할 가이드 URL
export const FILE_NAME = "certificate-login"; // 파일명
export const DESCRIPTION = "인증서로그인은 기존 GPKI 인증서 로그인과 동일한 기능을 제공한다."; // 설명
export const WEIGHT = 1; // "사이드 네비게이션에 동일한 depth(=동일한 parent를 가진 자식)에서 정렬하는 순번"
export const PARENT = "login"; // "부모 파일의 menu에 정의된 identifier 값"
```

### 3.2. 브랜치 생성
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


## 참고
- [가이드 작성 규칙](https://github.com/eGovFramework/egovframe-docs/tree/main)
- [Markdown Frontmatter 작성 방법](https://github.com/eGovFramework/egovframe-docs/blob/main/how-to-write-Frontmatter.md)