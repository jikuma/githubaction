import * as core from '@actions/core';
import * as github from '@actions/github';

export function run(token): any {
    const client = new github.GitHub(token);
    const repoNameWithOwner : string = process.env.GITHUB_REPOSITORY!;
    var repoNameWithOwnerArray = repoNameWithOwner.split("/", 2); 
    client.repos.createRelease({ owner: repoNameWithOwnerArray[0], repo: repoNameWithOwnerArray[1], tag_name: "google"})
}

