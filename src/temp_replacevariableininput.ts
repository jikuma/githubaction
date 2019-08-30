import * as core from '@actions/core';

export function getInput(name: string, options?: core.InputOptions): string {
    var value = core.getInput(name, options);
    if(value){
        var re = /GITHUB_REF/gi;
        value = value.replace(re, process.env.GITHUB_REF!); 
        var re = /GIHUB_SHORT_SHA/gi;
        value = value.replace(re, process.env.GIHUB_SHA!.substring(0,7)); 
        var re = /GIHUB_SHA/gi; 
        return value.replace(re, process.env.GIHUB_SHA!); 
    }

    return value;
}


