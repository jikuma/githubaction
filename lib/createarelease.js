"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
function run(token) {
    const client = new github.GitHub(token);
    const repoNameWithOwner = process.env.GITHUB_REPOSITORY;
    var repoNameWithOwnerArray = repoNameWithOwner.split("/", 2);
    client.repos.createRelease({ owner: repoNameWithOwnerArray[0], repo: repoNameWithOwnerArray[1], tag_name: "google" });
}
exports.run = run;
