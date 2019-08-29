import * as core from '@actions/core';
import * as github from '@actions/github';
import fs = require('fs');
import path = require("path");
import mime = require('browserify-mime');

export async function run(token) {
    const client = new github.GitHub(token);
    const repoNameWithOwner : string = process.env.GITHUB_REPOSITORY!;
    core.warning("Execution complete executing 1");
    var repoNameWithOwnerArray = repoNameWithOwner.split("/", 2); 
    const tag_name = core.getInput('tag_name', {required: true});
    core.warning("Execution complete executing 2");
    const release_title = core.getInput('release_title', {required: false});
    const release_note = core.getInput('release_note', {required: false});
    core.warning("Execution complete executing 3");
    const release_draft = core.getInput('release_draft', {required: false});
    const release_prerelease = core.getInput('release_prerelease', {required: false});
    core.warning("Execution complete executing 4");
    const release_asset_filepath = core.getInput('asset_filepath', {required: false});
    const release_target_commitish: string = process.env.GITHUB_SHA!;
    core.warning("Execution complete executing 5");
    client.repos.createRelease({ owner: repoNameWithOwnerArray[0],
        repo: repoNameWithOwnerArray[1],
        tag_name: tag_name,
        target_commitish: release_target_commitish,
        name: release_title,
        body: release_note,
        draft: (release_draft =="true"),
        prerelease: (release_prerelease =="true") }).then( respose => {
        core.warning("Execution complete executing 6");
        
        if(release_asset_filepath ) {
        core.warning("Execution complete executing 7");

            let rd = fs.createReadStream(release_asset_filepath);
            var stats = fs.statSync(release_asset_filepath);
            let fileName = path.basename(release_asset_filepath);
            client.repos.uploadReleaseAsset( {
                url: respose.data.upload_url,
                headers: {
                    "content-length": stats.size,
                    "content-type": mime.lookup(fileName)
                },
                file: rd,
                name: fileName
            })

            core.warning("Execution complete executing 8");
        }
    }).catch((err) => {
        core.warning("Execution complete executing 9");
        core.setFailed(err.message);
    })  
}

