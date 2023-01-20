const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a string: ', (string) => {
  // reverse the string
  let reversedString = string.split('').reverse().join('');
  console.log(reversedString);
  rl.close();
});