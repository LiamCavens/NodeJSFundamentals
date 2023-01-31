const fs = require('fs');
const { parse } = require('csv-parse');
const stream = require('stream');

const inputFile = 'csv/nodejs-hw1.csv'; // input csv file
const outputFile = 'outputs/output.json'; // output json file

// create a csv parser with desired options
const parser = parse({
  delimiter: ',', // specify the delimiter (e.g. ',' in this case)
  columns: true, // first row of data contains column names
  relax_column_count: true // allow different number of columns in each row
});

// create a stream transformer to convert each chunk of data to a JSON string
const transformer = new stream.Transform({
  objectMode: true, // operate on objects rather than binary data
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + ', \n'); // push the stringified JSON object and a newline character to the output stream
    callback();
  }
});

// create a read stream from the input file
const inputStream = fs.createReadStream(inputFile);

// create a write stream to the output file
const outputStream = fs.createWriteStream(outputFile);

// pipe the input stream through the parser and transformer, then to the output stream
inputStream
  .pipe(parser).on('error', (error) => console.error(`Error while reading CSV file: ${error.message}`))
  .pipe(transformer).on('error', (error) => console.error(`Error while converting to JSON: ${error.message}`))
  .pipe(outputStream).on('error', console.error(`Error while writing JSON file: ${error.message}`));