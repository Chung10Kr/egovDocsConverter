import {
  BRANCH_NAME
} from "./target.js";
import {
  TARGET_DIR,
  BRANCH_OWNER,
  UP_BRANCH_OWNER
} from "./properties.js";

import { execSync } from 'child_process';




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

  // 1) 최신 가져오기 (upstream, origin 둘 다)
  sh(`git -C ${TARGET_DIR} fetch upstream ${UP_BRANCH_OWNER} --prune`);
  sh(`git -C ${TARGET_DIR} fetch origin ${UP_BRANCH_OWNER} --prune`);

  // 2) 로컬 main을 origin/main 트래킹으로 체크아웃(없으면 생성)
  try {
    sh(`git -C ${TARGET_DIR} rev-parse --verify ${UP_BRANCH_OWNER}`);
    sh(`git -C ${TARGET_DIR} checkout ${UP_BRANCH_OWNER}`);
  } catch {
    // 로컬 main이 없으면 origin/main 기준으로 생성
    sh(
      `git -C ${TARGET_DIR} checkout -B ${UP_BRANCH_OWNER} --track origin/${UP_BRANCH_OWNER}`
    );
  }

  // 3) upstream/main → 로컬 main fast-forward (내 포크가 뒤쳐졌을 때 업데이트)
  sh(
    `git -C ${TARGET_DIR} merge --ff-only upstream/${UP_BRANCH_OWNER}`
  );

  // 4) 로컬 main을 내 포크(origin/main)에 푸시
  sh(`git -C ${TARGET_DIR} push origin ${UP_BRANCH_OWNER}`);

  // 5) (선택) 포크에서 다시 끌어와 최종 일치 확인
  sh(`git -C ${TARGET_DIR} pull --ff-only origin ${UP_BRANCH_OWNER}`);

  console.log("✅ upstream → origin(포크) → local(main) 동기화 완료");
} catch (e) {
  console.error("❌ 동기화 실패:", e.message);
  console.error("↪️ origin/main에 추가 커밋이 있어 fast-forward가 막혔는지 확인하세요.");
}