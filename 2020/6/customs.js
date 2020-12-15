
const fs = require('fs');

// Divide by groups (groups are separated by two newlines)
const input = fs.readFileSync('input.txt').toString().split(/(\n|\r\n){2}/);

// -- Part 1 --
// For each group declaration, extract all the unique
// declarations (a-z) and count how many there are. Sum 
// the number of unique declarations for each group. 
// The total is the solution to Part 1.
let totalUnique = 0;
for (const decl of input) {
    // Get all unique characters, only matching a-z (lowercase).
    let unique = new Set(decl.replace(/[^a-z]/g, ''));

    totalUnique += unique.size;
}

// -- Part 2 --
// The second part is to get the number of declarations 
// each group had in *common* and sum the total number 
// across all groups.
let totalCommon = 0;
for (const decl of input) {
    // Get the unique declarations for the first group member
    const individualDeclarations = decl.split(/\n|\r\n/);
    let common = new Set(individualDeclarations[0]);

    // Compute the set intersection of this first member's 
    // declarations and all the other members' declarations. 
    for (let i = 1; i < individualDeclarations.length; i++) {
        let individualDeclaration = new Set(individualDeclarations[i]);
        common.forEach(item => {
            if (!individualDeclaration.has(item)) common.delete(item);
        });
    }

    totalCommon += common.size;
}

console.log(totalUnique); // Part 1
console.log(totalCommon); // Part 2
