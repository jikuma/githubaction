"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
function getInput(name, options) {
    var value = core.getInput(name, options);
    if (value) {
        var re = /GITHUB_REF/gi;
        value = value.replace(re, process.env.GITHUB_REF);
        var re = /GIHUB_SHORT_SHA/gi;
        value = value.replace(re, process.env.GIHUB_SHA.substring(0, 7));
        var re = /GIHUB_SHA/gi;
        return value.replace(re, process.env.GIHUB_SHA);
    }
    return value;
}
exports.getInput = getInput;
