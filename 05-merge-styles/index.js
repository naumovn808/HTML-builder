const path = require('path');
const fs = require('fs');

const sourcePath = path.resolve(__dirname, 'styles');
const pathForBundle = path.resolve(__dirname, 'project-dist', 'bundle.css');

function createBundle() {
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

}

createBundle();
