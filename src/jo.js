#!/usr/bin/env node 
'use strict';

import path from 'path';
import fs from 'fs';
import program from 'commander';
import {spawn} from 'child_process';
import {version} from '../package.json';
import rimraf from 'rimraf';

const gitRepoUrl = "https://github.com/juemeng/Jo.git";

program
  .version(version)
  .command('init [dir]')
  .action(function (dir) {
     if(dir){
         if(dir.indexOf('/') === -1 && dir.indexOf('\\') === -1)
         {
             console.log('invalid target path, please input again');
             return;
         }
         cloneStarterKit(dir);
     }else {
         cloneStarterKit();
     }
  });

program.parse(process.argv);

function cloneStarterKit(dir) {
    
    let target = process.cwd();

    if(dir) {
        target = dir;
    }
    
    let gitArgs = ['clone', '--recursive', gitRepoUrl,target];
    
    const ls = spawn('git', gitArgs, { 'shell': true });

    ls.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    ls.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    ls.on('close', (code) => {
        if (code === 0) {
            let gitPath = path.join(target,'.git');
            rimraf(gitPath, function () {
                console.log("init success");
            });
        } else {
            console.log(`child process exited with code ${code}`);
        }
    });
}
