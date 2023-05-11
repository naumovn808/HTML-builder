const path = require('path');
const { stat } = require('fs');
const { readdir } = require('fs/promises');
let folderPath = path.resolve(__dirname, 'secret-folder');

function readFiles(folderPath) {

  readdir(folderPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {

      let fileName = file.name.split('.')[0];
      let fileExtension = path.extname(file.name).slice(1);
      let filePath = path.join(folderPath, file.name);

      stat(filePath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          let fileSize = stats.size;
          console.log(`${fileName} - ${fileExtension} - ${fileSize}`);
        } 
      });
    })

  });
}

readFiles(folderPath);









// const KB = 1024;

// function readFiles(folderPath) {
//   readdir(folderPath, { withFileTypes: true }).then((files) => {
//     files.forEach((file) => {

//       let fileExt = path.extname(file.name);
//       let fileName = path.basename(file.name, fileExt);
//       let filePath = path.join(folderPath, file.name);
//       let fileSize = 0;
//       let result = '';

//       console.log(fileName);
//       console.log(fileExt);

//       // if (fileExt === '') {
//       //   fileName = 'unnamed';
//       //   fileExt = file.name;
//       // }
//       // stat(filePath, (err, stats) => {
//       //   if (stats.isFile()) {
//       //     fileSize = stats.size / KB;
//       //     if (fileSize != 0) {
//       //       fileSize = fileSize.toFixed(3);
//       //     }
//       //     fileExt = fileExt.split('.');
//       //     result = `${fileName} - ${fileExt[1]} - ${fileSize}kb`;
//       //     console.log(result);
//       //   } else {
//       //     let deepFolderPath = path.join(folderPath, file.name);
//       //     readFiles(deepFolderPath);
//       //   }
//       // });

//     });
//   });
// }

// readFiles(folderPath);