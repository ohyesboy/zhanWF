import * as core from '@actions/core';

async function run() {
  try {
    core.info('hello zhan');
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
