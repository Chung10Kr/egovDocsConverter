import {
  BRANCH_NAME
} from "./target.js";
import {
  TARGET_DIR,
  UP_BRANCH_OWNER,
  BRANCH_OWNER
} from "./properties.js";

import { execSync } from 'child_process';

try {
  // 1. Git branch 생성
  execSync(`git -C ${TARGET_DIR} checkout -b ${BRANCH_NAME} origin/${BRANCH_OWNER}`);
  
  console.log(`Switched to new branch '${BRANCH_NAME}' in directory '${TARGET_DIR}'`);
} catch (error) {
  console.error(`Failed to execute git commands: ${error.message}`);
}