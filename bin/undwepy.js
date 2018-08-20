#!/usr/bin/env node

const program = require('commander');
const prompt = require('prompt');
const fs = require('fs');
const fse = require('fs-extra');
const download = require('../tool/download');

const schema = [
    {
        name: 'projectName',
        required: true,
        description: 'Please enter your project name',
        type: 'string',
        default: 'undunion-wepy'
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
                resolve(result.projectName);
            });
        });
        getProjectName.then(name => {
            projectName = name;
            // console.log('projectName: ' + projectName);
            fs.readdir(process.cwd(), (err, files) => {
                if (err) {
                    console.log('readdir: ' + err);
                    return;
                }
                if (files.includes(projectName)) {
                    console.log(`The ${projectName} has existed!`);
                    process.exit(0);
                } else {
                    fs.mkdir(projectName, (err, result) => {
                        if (err) {/**/
                            console.log('mkdir: ' + err);
                            process.exit(0);
                        }
                        console.log(`create dir ${projectName} successfully \n`);
                        // download模板文件
                        download()
                            .then((tempSrc) => {
                                fse.copy(tempSrc, projectName)
                                    .then(() => {console.log('copy success \n');})
                                    .catch(err => {console.log('copy error: ' + err);})
                            })
                            .catch(err => {
                                console.log('download err: ' + err);
                            })
                    })
                }
            });
        }).catch(err => {
            console.log('projectName error: ' + err);
        });
    });


program.parse(process.argv);
// program.help();
