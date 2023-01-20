import csv from 'csvtojson';
import fs from 'fs';

(async () => {
  try {
    const data = await fs.promises.readFile('./csv/nodejs-hw1.csv', 'utf8');
    const jsonObj = await csv().fromString(data);
    await fs.promises.writeFile('./outputs/outputByBabel.txt', JSON.stringify(jsonObj, null, 2));
    console.log('The file has been saved!');
  } catch (err) {
    console.log(err);
  }
})();