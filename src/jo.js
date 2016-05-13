#!/usr/bin/env node 

import path from 'path';
import fs from 'fs';
import program from 'commander';
import {spawn} from 'child_process';
import {version} from '../package.json';

const gitRepoUrl = 'https://github.com/juemeng/Jo.git';


const log = console.log;
let cmdValue = "";
let envValue = "";

program
  .version(version)
  .command('init [dir]')
  .action(function (dir) {
     if(dir){
         const ls = spawn('git', ['clone', '--recursive', gitRepoUrl, dir], { 'shell': true });
         ls.stdout.on('data', (data) => {

         });

         ls.stderr.on('data', (data) => {
             console.log(`stderr: ${data}`);
         });

         ls.on('close', (code) => {
             console.log(`child process exited with code ${code}`);
         });
     }else {
         
     }
  });

program.parse(process.argv);
