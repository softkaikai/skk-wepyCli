const download = require('download-git-repo');
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const rm = require('fs-extra').removeSync;
const homeDir = require('user-home');
const logger = require('./logger');

module.exports = function(target) {
    return new Promise((resolve, reject) => {
        target = path.join(homeDir, target || '.', '.undunion-wepy-template');

        // remove the local directory
        if (fs.existsSync(target)) {
            rm(target);
        }

        const spinner = ora({
            color: 'green',
        });
        spinner.start('正在下载模板文件，这个过程可能需要花费几分钟的时间，请耐心等待。。。');

        download('direct:https://github.com/softkaikai/skk-wepy-template.git', target, { clone: true }, function (err) {
            spinner.stop();
            if (err) {
                logger.error('download fail');
                reject(err);
            } else {
                logger.succeed('download succeed');
                resolve(target);
            }
        })
    })
};


