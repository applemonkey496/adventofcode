
const fs = require('fs');

const input = fs.readFileSync('./input.txt').toString().split('\n');

let correctMethodOne = 0;
let correctMethodTwo = 0;

for (const line of input) {
    let tokens = line.split(' ');

    let range = tokens[0].split('-');
    let [a, b] = [parseInt(range[0]), parseInt(range[1])];
    let char = tokens[1][0];
    let pwd = tokens[2];

    let matchesMethodOne = Array.from(pwd.matchAll(char)).length;
    if (a <= matchesMethodOne && matchesMethodOne <= b) correctMethodOne ++;

    if (pwd[a - 1] === char ^ pwd[b - 1] === char) correctMethodTwo ++;
}

console.log(correctMethodOne);
console.log(correctMethodTwo);
