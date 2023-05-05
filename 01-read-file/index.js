const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt')
const readableStream = fs.ReadStream(filePath, 'utf-8');

let data = '';
readableStream.on('data', chunk => console.log(chunk));
readableStream.on('end', () => console.log('End', data));
readableStream.on('error', error => console.log('Error', error.message));