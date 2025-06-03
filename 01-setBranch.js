import {
  BRANCH_NAME
} from "./target.js";
import {
  TARGET_DIR,
  BRANCH_OWNER
} from "./properties.js";

import { execSync } from 'child_process';


try {
  // 1. 지정한 디렉토리(TARGET_DIR)에서 origin/BRANCH_OWNER(main 등)를 기준으로 새로운 브랜치(BRANCH_NAME)를 생성하고 해당 브랜치로 체크아웃
  execSync(`git -C ${TARGET_DIR} checkout -b ${BRANCH_NAME} origin/${BRANCH_OWNER}`);
  
  console.log(`Switched to new branch '${BRANCH_NAME}' in directory '${TARGET_DIR}'`);
} catch (error) {
  console.error(`Failed to execute git commands: ${error.message}`);
}