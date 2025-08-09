import { execSync } from "child_process";
import {
  TARGET_DIR,
  BRANCH_OWNER,        // "contribution"
  UP_BRANCH_OWNER,     // "main"
  UP_STREAM_REPO_OWNER,
  UP_STREAM_REPO_NAME,
} from "./properties.js";
import { BRANCH_NAME } from "./target.js";

const sh = (cmd) => execSync(cmd, { stdio: "inherit" });

try {
  // 0) upstream 리모트 보장
  try {
    sh(`git -C ${TARGET_DIR} remote get-url upstream`);
  } catch {
    sh(
      `git -C ${TARGET_DIR} remote add upstream https://github.com/${UP_STREAM_REPO_OWNER}/${UP_STREAM_REPO_NAME}.git`
    );
  }

  // 1) 최신 가져오기
  sh(`git -C ${TARGET_DIR} fetch upstream ${UP_BRANCH_OWNER} --prune`);   // upstream/main
  sh(`git -C ${TARGET_DIR} fetch origin ${BRANCH_OWNER} --prune`);        // origin/contribution

  // 2) 로컬 contribution을 origin/contribution 트래킹으로 체크아웃(없으면 생성)
  try {
    sh(`git -C ${TARGET_DIR} rev-parse --verify ${BRANCH_OWNER}`);
    sh(`git -C ${TARGET_DIR} checkout ${BRANCH_OWNER}`);
  } catch {
    sh(
      `git -C ${TARGET_DIR} checkout -B ${BRANCH_OWNER} --track origin/${BRANCH_OWNER}`
    );
  }

  // 3) upstream/main → 로컬 contribution fast-forward
  //    (로컬/포크가 뒤쳐졌을 때만 앞으로 이동; diverge면 에러)
  sh(`git -C ${TARGET_DIR} merge --ff-only upstream/${UP_BRANCH_OWNER}`);

  // 4) 로컬 contribution → origin/contribution 푸시
  sh(`git -C ${TARGET_DIR} push origin ${BRANCH_OWNER}`);

  // 5) (선택) 최종 일치 확인
  sh(`git -C ${TARGET_DIR} pull --ff-only origin ${BRANCH_OWNER}`);

  console.log("✅ upstream/main → local/origin contribution 동기화 완료");

  // 6) 작업 브랜치 생성 (베이스: 로컬 contribution 최신 상태)
  sh(`git -C ${TARGET_DIR} checkout -b ${BRANCH_NAME} ${BRANCH_OWNER}`);
  console.log(`Switched to new branch '${BRANCH_NAME}' in '${TARGET_DIR}'`);
} catch (e) {
  console.error("❌ 동기화 실패:", e.message);
  console.error("↪️ contribution 브랜치가 upstream/main과 '분기'되어 ff-only가 막혔을 수 있어요.");
  console.error("   - 그대로 덮어쓰려면 아래 명령으로 강제 미러링 하세요:");
  console.error(`     git -C ${TARGET_DIR} checkout ${BRANCH_OWNER}`);
  console.error(`     git -C ${TARGET_DIR} reset --hard upstream/${UP_BRANCH_OWNER}`);
  console.error(`     git -C ${TARGET_DIR} push -f origin ${BRANCH_OWNER}`);
}