#!/usr/bin/env node 
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _child_process = require('child_process');

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gitRepoUrl = 'https://github.com/juemeng/Jo.git';

var log = console.log;
var cmdValue = "";
var envValue = "";

_commander2.default.version(_package.version).command('init [dir]').action(function (dir) {
    if (dir) {
        var ls = (0, _child_process.spawn)('git', ['clone', '--recursive', gitRepoUrl, dir], { 'shell': true });
        ls.stdout.on('data', function (data) {});

        ls.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        ls.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
    } else {}
});

_commander2.default.parse(process.argv);
