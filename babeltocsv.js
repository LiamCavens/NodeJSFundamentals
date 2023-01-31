import fs from 'fs';
import csv from 'csv-parser';

let writer = fs.createWriteStream('outputs/output-babel.json');

fs.createReadStream('csv/nodejs-hw1.csv')
  .pipe(csv())
  .on('data', (data) => {
    writer.write(JSON.stringify(data) + ', \n');
  })
  .on('error', (error) => {
    console.log(error);
  });