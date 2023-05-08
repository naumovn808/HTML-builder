const path = require('path');
const fs = require('fs');

const copyFolderName = 'files-copy';
const sourceFolderName = 'files';
const sourcePath = path.resolve(__dirname, sourceFolderName);
const newFolderPath = path.resolve(__dirname, copyFolderName);

function copyDir() {

    fs.stat(newFolderPath, function (err, stats) {
        if (err) {
            fs.mkdir(newFolderPath, err => {
                if (err) throw err;
            });
        }
    });


    fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.map((file) => {

            let currentPath = path.join(sourcePath, file.name);
            let copiesPath = path.join(newFolderPath, file.name);

            fs.copyFile(currentPath, copiesPath, err => {
                if(err) throw err;
            });
        })
        console.log('Файлы успешно скопированы');
    });
}

copyDir();