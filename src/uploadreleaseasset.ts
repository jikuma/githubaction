import * as core from '@actions/core';
import * as github from '@actions/github';
import fs = require('fs');
import path = require("path");
import mime = require('browserify-mime');

export async function run(token) {
    const client = new github.GitHub(token);
    const repoNameWithOwner : string = process.env.GITHUB_REPOSITORY as string;
    var repoNameWithOwnerArray = repoNameWithOwner.split("/", 2); 
    const tag_name = require('./temp_replacevariableininput').getInput('tag_name', {required: true});
    core.debug("Tagname is "+ tag_name)
    const release_asset_filepath = core.getInput('asset_filepath', {required: false});
    core.debug("Uploading assets to release with tag "+ tag_name);

    client.repos.getReleaseByTag({ owner: repoNameWithOwnerArray[0],
        repo: repoNameWithOwnerArray[1],
        tag: tag_name }).then( respose => {
        if(release_asset_filepath ) {
            let rd = fs.createReadStream(release_asset_filepath);
            var stats = fs.statSync(release_asset_filepath);
            let fileName = path.basename(release_asset_filepath);
            core.debug("Uploading asset "+ release_asset_filepath);
            client.repos.uploadReleaseAsset( {
                url: respose.data.upload_url,
                headers: {
                    "content-length": stats.size,
                    "content-type": mime.lookup(fileName)
                },
                file: rd,
                name: fileName
            })
        }
    }).catch((err) => {
        core.setFailed(err.message);
    })  
}

