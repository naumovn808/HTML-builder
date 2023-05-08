const path = require('path');
const fs = require('fs');

const DistPath = path.resolve(__dirname, 'project-dist');
const templatePath = path.resolve(__dirname, 'template.html');
const componentsPath = path.resolve(__dirname, 'components');
const pathForHtml = path.resolve(__dirname, 'project-dist', 'index.html');

const sourcePath = path.resolve(__dirname, 'styles');
const pathForBundle = path.resolve(__dirname, 'project-dist', 'style.css');

const sourcePathAssets = path.resolve(__dirname, 'assets');
const distPathAssets = path.resolve(__dirname, 'project-dist', 'assets');

function createHtml() {

    fs.stat(DistPath, function (err, stats) {
        if (err) {
            fs.mkdir(DistPath, err => {
                if (err) throw err;
            });
        }
    });

    fs.readFile(templatePath, { withFileTypes: true }, (err, data) => {
        if (err) throw err;
        let arr = data.toString().split('\n');
        arr.map((elem, index) => {
            fs.readdir(componentsPath, { withFileTypes: true }, (err, data) => {
                if (err) throw err;
                data.map((file) => {
                    let filePath = path.join(componentsPath, file.name);
                    let fileExt = path.extname(file.name);
                    let fileName = path.basename(file.name, fileExt);
                    let template = `{{${fileName}}}`;
                    if (elem.trim() == template) {
                        fs.readFile(filePath, function (err, data) {
                            if (err) throw err;
                            data = data.toString();
                            arr.splice(index, 1, data);
                            fs.createWriteStream(pathForHtml).write(arr.join('\n'));
                        })
                    }
                })
            })
        });
    });

};

function createStyle() {
    fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {

        files.map((file) => {
            const ext = path.extname(file.name).slice(1);

            if (ext == 'css') {
                fs.readFile(path.join(sourcePath, file.name), 'utf-8', (err, data) => {
                    if (err) throw err;
                    fs.appendFile(pathForBundle, data, function (err) {
                        if (err) throw err;
                    })
                })
            }
        })

    })

};

function copyFolder(src, dest) {
    return new Promise((resolve, reject) => {
        fs.access(dest, error => {
            if (error) {
                if (error.code === 'ENOENT') {
                    fs.mkdir(dest, copy);
                } else {
                    reject(error);
                }
            } else {
                copy();
            }
        });

        function copy() {
            fs.readdir(src, (error, files) => {
                if (error) return reject(error);

                let count = files.length;
                if (count === 0) return resolve();

                files.forEach((file) => {
                    const currentPath = path.join(src, file);
                    const newPath = path.join(dest, file);

                    fs.stat(currentPath, (error, fileStat) => {
                        if (error) return reject(error);

                        if (fileStat.isDirectory()) {
                            copyFolder(currentPath, newPath).then(() => {
                                if (--count === 0) resolve();
                            }).catch(reject);
                        } else {
                            fs.copyFile(currentPath, newPath, error => {
                                if (error) return reject(error);

                                if (--count === 0) resolve();
                            });
                        }
                    });
                });
            });
        }
    });
};


// copyDir();
createHtml();
createStyle();
copyFolder(sourcePathAssets, distPathAssets)