
enum types {
    empty = 'L',
    occupied = '#',
    floor = '.'
};

import * as fs from 'fs';

const input = fs.readFileSync('input.txt').toString().split(/\n|\r\n/)
                .map(i => Array.from(i)) as types[][];

let grid : types[][];

function scenario(getNeighbours : (i: number, j: number) => types[], tolerance : number): number {
    grid = input.map(row => row.slice());

    const step = (): void => {
        let changes = {};
        for (let i = 0; i < grid.length; i++) {
            let row = grid[i];
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];

                if (cell === types.empty) {
                    let occupied = getNeighbours(i, j).filter(k => k === types.occupied);
                    if (occupied.length === 0) changes[JSON.stringify([i, j])] = types.occupied;
                } else if (cell === types.occupied) {
                    let occupied = getNeighbours(i, j).filter(k => k === types.occupied);
                    if (occupied.length >= tolerance) changes[JSON.stringify([i, j])] = types.empty;
                }
            }
        }

        for (const key in changes) {
            const [i, j] = JSON.parse(key);
            grid[i][j] = changes[key];
        }
    }

    let last: types[][];
    do {
        last = grid.map(row => row.slice());
        step();
        fs.writeFileSync('after.txt', grid.map(row => row.join('')).join('\n').replace(',', ''));
    } while (JSON.stringify(grid) !== JSON.stringify(last));

    const flat = Array.prototype.concat.apply([], grid) as types[];
    return flat.filter(i => i === types.occupied).length;
}

const getNeighboursPartOne = (i: number, j: number): types[] => {
    // Neighbouring indices in terms of i and j:
    // [i-1,j-1] [i-1,j] [i-1,j+1]
    // [ i ,j-1]         [ i ,j+1]
    // [i+1,j-1] [i+1,j] [i+1,j+1]
    const neighbours = [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1]
    ];

    return neighbours.map(([i, j]) => grid[i]?.[j] ?? types.floor);
}

const getNeighboursPartTwo = (i_: number, j_: number) : types[] => {
    // directions
    // [-i,-j] [-i] [-i,+j]
    // [ -j  ]      [ +j  ]
    // [+i,-j] [+i] [+i,+j] 
    const increases: { (i_: number, j_: number): [number, number] }[] = [
        (i, j) => { i--; j--; return [i,j]; },
        (i, j) => { i--; j++; return [i,j]; },
        (i, j) => { i++; j--; return [i,j]; },
        (i, j) => { i++; j++; return [i,j]; },
        (i, _j) => { i++; return [i,_j]; },
        (i, _j) => { i--; return [i,_j]; },
        (_i, j) => { j++; return [_i,j]; },
        (_i, j) => { j--; return [_i,j]; },
    ]

    const neighbours = increases.map(next => {
        let i = i_;
        let j = j_;

        while(true) {
            [i, j] = next(i, j); 
            let cell = grid[i]?.[j]; 
            if (cell !== types.floor) { 
                return cell; 
            } else if (cell === undefined) {
                return types.floor;
            } else { continue; }
        }
    });

    return neighbours;
}

let one = scenario(getNeighboursPartOne, 4);
let two = scenario(getNeighboursPartTwo, 5);

console.log(two);
