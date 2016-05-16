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

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gitRepoUrl = "https://github.com/juemeng/Jo.git";

_commander2.default.version(_package.version).command('init [dir]').action(function (dir) {
    if (dir) {
        if (dir.indexOf('/') === -1 && dir.indexOf('\\') === -1) {
            console.log('invalid target path, please input again');
            return;
        }
        cloneStarterKit(dir);
    } else {
        cloneStarterKit();
    }
});

_commander2.default.parse(process.argv);

function cloneStarterKit(dir) {

    var target = process.cwd();

    if (dir) {
        target = dir;
    }

    var gitArgs = ['clone', '--recursive', gitRepoUrl, target];

    var ls = (0, _child_process.spawn)('git', gitArgs, { 'shell': true });

    ls.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    ls.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    ls.on('close', function (code) {
        if (code === 0) {
            var gitPath = _path2.default.join(target, '.git');
            (0, _rimraf2.default)(gitPath, function () {
                console.log("init success");
            });
        } else {
            console.log('child process exited with code ' + code);
        }
    });
}