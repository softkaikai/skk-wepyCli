#!/usr/bin/env node

const program = require('commander');


program.version('1.0.0')
    .usage('[option]')
    .option('d, --dir [path]', 'return dir path')
    .option('n, --name [name]', 'return project name')
    .command('path', 'bin/index')
    .parse(process.argv);
console.log(program.args);
program.help();
