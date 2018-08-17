#!/usr/bin/env node
console.log('11111');
const program = require('commander');

program.usage('undwepy').parse(process.argv);
console.log(program.args);
