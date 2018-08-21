const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');

module.exports = function(metadata, src, dest) {
    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, callback) => {
                const data = metalsmith.metadata();
                for (let fileName of Object.keys(files)) {
                    const t = files[fileName].contents.toString();
                    if (fileName.includes('package.json')) {
                        files[fileName].contents = new Buffer(Handlebars.compile(t)(data));
                    }
                }
                callback();
            })
            .build(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
    })
};