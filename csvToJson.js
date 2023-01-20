const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile('./csv/nodejs-hw1.csv')
  .then((jsonObj) => {
    fs.writeFile('./outputs/output.txt', JSON.stringify(jsonObj, null, 2), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });