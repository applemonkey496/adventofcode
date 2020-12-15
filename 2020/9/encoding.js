
// -- Part 2 -- //
// (part 1 in c++)

const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split(/\n|\r\n/).map(i => parseInt(i));
const illegal = 167829540; // hard code this to the output from part 1

function partTwo() {
    // Look for lists of different sizes starting at different locations.
    for (len = 2; len < input.length; len++) {
        for (start = 0; start <= input.length - len; start++) {
            // Sum the portion of the array starting at start with 
            // length len and compare it to the target value.
            let numbers = input.slice(start, start + len);
            if (numbers.reduce((j, k) => j + k) === illegal) {
                // Sum the minimum and maximum values
                let min = Math.min(...numbers);
                let max = Math.max(...numbers);
                return min + max;
            }
        }
    }
}

let two = partTwo();
console.log(two);
