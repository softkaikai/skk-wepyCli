const download = require('download-git-repo');
const ora = require('ora');
const path = require('path');

module.exports = function(target) {
    return new Promise((resolve, reject) => {
        target = path.join(target || '.', '.download-temp');

        const spinner = ora({
            color: 'green',
        });
        spinner.start('正在下载模板文件，这个过程可能需要花费几分钟的时间，请耐心等待。。。');

        download('direct:https://github.com/softkaikai/skk-wepy-template.git', target, { clone: true }, function (err) {
            if (err) {
                spinner.fail('download fail \n');
                reject(err);
            } else {
                spinner.succeed('download succeed \n');
                resolve(target);
            }
        })
    })
};


