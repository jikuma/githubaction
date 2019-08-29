import * as core from '@actions/core';

let operationsMap = {
  "create a release": "./createarelease",
  "createarelease": "./createarelease"
}

async function run() {
  try {
    const token = core.getInput('repo-token', {required: true});
    const operation = core.getInput('operation', {required: true});
    if (!("key" in operationsMap)) {
      core.setFailed("Not a valid operation input, valid operations are 'create a release'");    
    }
    else
    {
      require(operationsMap[operation]).run(token)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
