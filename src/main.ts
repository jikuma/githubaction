import * as core from '@actions/core';

let operationsMap = {
  "create a release": "./createarelease",
  "createarelease": "./createarelease",
  "uploadtorelease": "./uploadreleaseasset",
  "uploadanassettoarelease": "./uploadreleaseasset",
  "upload to release": "./uploadreleaseasset",
  "upload an asset to a release": "./uploadreleaseasset",
}

async function run() {
  try {
    const token = core.getInput('repo-token', {required: true});
    const operation = core.getInput('operation', {required: true});
    if (!(operation in operationsMap)) {
      core.setFailed("Not a valid operation input, valid operations are 'create a release'");    
    }
    else
    {
      await require(operationsMap[operation]).run(token)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
