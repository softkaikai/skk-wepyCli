#!/usr/bin/env node

const program = require('commander');
const prompt = require('prompt');
const fs = require('fs');
const fse = require('fs-extra');
const download = require('../tool/download');
const logger = require('../tool/logger');
const generator = require('../tool/generator');


const schema = [
    {
        name: 'projectName',
        required: true,
        description: 'Please enter your project name',
        type: 'string',
        default: 'undunion-wepy'
    },
    {
        name: 'version',
        required: true,
        description: 'Please enter your project version',
        type: 'string',
        default: '1.0.0'
    },
    {
        name: 'description',
        description: 'Please enter your project description',
        type: 'string',
        default: 'mini app'
    },
    {
        name: 'author',
        required: true,
        description: 'Please enter your project author name',
        type: 'string',
        default: 'anonymous'
    }
];
let projectName = 'undunion-wepy';


program.version('1.0.0')
    .usage('[option]')
    .option('-d, --dir [path]', 'return dir path')
    .option('-w, --watch [file]', 'watch files', 'test/files')
    .option('-n, --name [name]', 'return project name')

program
    .command('create')
    .description('create project')
    .action(function() {
        // enter project name and then create a dir
        prompt.start();
        const getProjectName = new Promise((resolve, reject) => {
            prompt.get(schema, function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
        getProjectName.then(result => {
            let metadata = result;
            projectName = result.projectName;
            // logger.error('projectName: ' + projectName);
            fs.readdir(process.cwd(), (err, files) => {
                if (err) {
                    logger.error('readdir: ' + err);
                    return;
                }
                if (files.includes(projectName)) {
                    logger.error(`The ${projectName} has existed!`);
                    process.exit(0);
                } else {
                    fs.mkdir(projectName, (err, result) => {
                        if (err) {/**/
                            logger.error('mkdir: ' + err);
                            process.exit(0);
                        }
                        logger.succeed(`create dir ${projectName} successfully`);
                        // download模板文件
                        download()
                            .then((tempSrc) => {
                                generator(metadata, tempSrc, projectName)
                                    .then(() => {logger.succeed('copy success');})
                                    .catch(err => {logger.error('copy error: ' + err);})
                            })
                            .catch(err => {
                                logger.error('download err: ' + err);
                            })
                    })
                }
            });
        }).catch(err => {
            logger.error('projectName error: ' + err);
        });
    });


program.parse(process.argv);
// program.help();
