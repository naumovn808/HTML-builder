const path = require('path');
const fs = require('fs');
const readline = require('readline');

const { stdin, stdout } = require('process');
const fileName = 'text.txt';
const text = 'Введите текст!';
const goodBye = 'До свидания!';

const filePath = path.resolve(__dirname, fileName);
const writeableStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

rl.on('SIGINT', function () {
  console.log(`\n${goodBye}`);
  rl.close();
});

rl.on('line', function (data) {
  if (data === 'exit') {
    console.log(`\n${goodBye}`);
    rl.close();
  }
});

console.log(text + '\n');
stdin.pipe(writeableStream);