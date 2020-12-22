
// Read input into list of numbers and sort ascending
const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split(/\n|\r\n/)
                .map(i => parseInt(i)).sort((i, j) => i - j);

const tribonnaci = require('./tribonacci');

function partOne() {
    let ones = 0;
    let threes = 0;
    let last = 0;
    for (const k of input) {
        let diff = k - last;

        if (diff === 1) ones ++;
        else if (diff === 3) threes ++;

        last = k;
    }

    // Return the product. Increment threes by one
    // because the joltage difference to the final 
    // device is always 3.
    return ones * ++threes;
}

function partTwo() {
    // Add the socket and the device's adapter (max + 3)
    const max = input[input.length - 1];
    const list = [0, ...input, max + 3];


    // This takes advantage of the fact that there are only
    // jumps of one and three. Any jumps of three *must* be 
    // included to reach any given joltage level above that 
    // jump, e.g. 1,2,5,6,7,10 has to use 2, 5, and 7 to 
    // reach 10. So, there will be no options for how to 
    // configure these adapters. However, with the adapters 
    // with jumps of +1, there will be multiple ways to arrange 
    // these adapters. It just so happens that the number of 
    // possible arrangements for n adapters in a row with a 
    // difference of +1 is the nth tribonacci number (like the 
    // Fibonacci numbers, but each number is the sum of the last 
    // three numbers instead of two).

    // To compute this, go through the list and keep counting
    // runs of +1 jumps. Once the run is broken, multiply the
    // current number of options by the tribonacci multiplier
    // and then start the run again. 
    let run = 1;
    let mul = 1;
    for (const j of list) {
        if (list.includes(j + 1)) {
            run += 1;
        } else {
            mul *= tribonnaci[run - 1];
            run = 1;
        }
    }

    return mul;
}

let one = partOne();
let two = partTwo();

console.log(one);
console.log(two);
