
const fs = require('fs');

// Separate input file by line
const input = fs.readFileSync('./input.txt').toString().split('\n');

// The counter for valid passwords.
// methodOne is for the first part
// of day 2 and methodTwo is for the 
// second part.
let correctMethodOne = 0;
let correctMethodTwo = 0;

for (const line of input) {
    // Separate line into three 'tokens'. The first 
    // token is the range (e.g. "5-6"). This needs to 
    // be parsed into an array. The second token is the 
    // character to look for, with a colon. The colon 
    // can be parsed out. The third token is the password.
    // This doesn't need to be parsed.
    let tokens = line.split(' ');

    // Parse first token
    let range = tokens[0].split('-');
    let [a, b] = [parseInt(range[0]), parseInt(range[1])];

    // Parse second token. It's only one character plus a colon,
    // so there's no need to search and replace, just extract the
    // first character.
    let char = tokens[1][0];

    // Get third token.
    let pwd = tokens[2];

    let matchesMethodOne = Array.from(pwd.matchAll(char)).length;
    if (a <= matchesMethodOne && matchesMethodOne <= b) correctMethodOne ++;

    // Subtract one from the indices because they start
    // at one. Xor (^) is used to make sure exactly one
    // of the conditions is correct.
    if (pwd[a - 1] === char ^ pwd[b - 1] === char) correctMethodTwo ++;
}

// Output
console.log(correctMethodOne);
console.log(correctMethodTwo);
