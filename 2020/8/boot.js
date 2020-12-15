
const fs = require('fs');

// -- Parse Input -- 
// Parse into an array of [opcode, val]

const input = fs.readFileSync('input.txt').toString().split(/\n|\r\n/);
let instructions = [];

for (const line of input) {
    let [opcode, val] = line.split(' ');
    instructions.push([opcode, val]);
}

// The implementation is quite straightforward. 
// Run using the instructions provided in the 
// challenge until getting to a line that has 
// already been run. 
function partOne() {
    let ran = [];
    let i = 0;
    let acc = 0;

    while (!ran.includes(i)) {
        let [opcode, val] = instructions[i];
        if (opcode === 'nop') {
            ran.push(i);
            i++;
        } else if (opcode === 'acc') {
            acc += parseInt(val);
            ran.push(i);
            i++;
        } else if (opcode === 'jmp') {
            ran.push(i);
            i += parseInt(val);
        } else { throw new Error('Invalid opcode.') }
    }

    return acc;
}

// Use the same implementation as part one, but 
// try flipping every nop to jmp and vice versa
// and see if it allows the code to complete.
// The code is "complete" if it tries to run the
// instruction after the last index. 
function partTwo() {
    for (let j = 0; j < instructions.length; j++) {
        // Create a local copy of the parsed code to modify
        let instrs = instructions.slice();
        let [opcode, val] = instructions[j];

        // Swap jmp with nop and nop with jmp
        if (opcode === 'nop') instrs[j] = ['jmp', val];
        else if (opcode === 'jmp') instrs[j] = ['nop', val];
        
        // If it's not jmp or nop, then nothing has changed,
        // so don't run through it; skip to the next iteration.
        else continue;

        // Ideally, there could be a common implementation for 
        // parts 1 and 2, as there is a lot of overlap, but they 
        // have different exit conditions, so that may be more
        // complicated than what is in the interest of time.
        let ran = [];
        let i = 0;
        let acc = 0;
        while (!ran.includes(i)) {
            let [opcode_, val_] = instrs[i];

            if (opcode_ === 'nop') {
                ran.push(i);
                i++;
            } else if (opcode_ === 'acc') {
                acc += parseInt(val_);
                ran.push(i);
                i++;
            } else if (opcode_ === 'jmp') {
                ran.push(i);
                i += parseInt(val_);
            } else { throw new Error('Invalid opcode.') }

            if (i > instrs.length - 1) {
                return acc;
            }
        }
    }

    throw new Error("No one instruction could be changed to prevent recursion.");
}

let one = partOne();
let two = partTwo();

console.log(one);
console.log(two);
