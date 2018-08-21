const chalk = require('chalk');

exports.log = function(msg) {
    console.log(chalk.black('ˇ▽ˇ ' + msg + ' \n'));
};

exports.error = function(msg) {
    console.log(chalk.red('∪︿∪ ' + msg + ' \n'));
};

exports.succeed = function(msg) {
    console.log(chalk.yellow('╯▽╰ ' + msg + ' \n'));
};