import * as core from '@actions/core';

let operationsMap = {
  "create a release": "./createarelease",
  "createarelease": "./createarelease"
}

async function run() {
  core.debug("executing ");
  core.warning("executing ");
  try {
    const token = core.getInput('repo-token', {required: true});
    const operation = core.getInput('operation', {required: true});
    if (!(operation in operationsMap)) {
      core.setFailed("Not a valid operation input, valid operations are 'create a release'");    
    }
    else
    {
      core.warning("going for execution");
      await require(operationsMap[operation]).run(token)
    }
  } catch (error) {
    core.setFailed(error.message);
  }

  core.warning("Execution complete executing -- end of everything");
}

run();
