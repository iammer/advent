#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input','utf-8').split('\n');
input.pop();

const ROWS = 6;
const COLS = 50;

/*
const input = [
    'rect 3x2',
    'rotate column x=1 by 1',
    'rotate row y=0 by 4',
    'rotate column x=1 by 1'
];
 
const ROWS = 3;
const COLS = 7;
*/

const screen = [];
for (let i = 0; i < ROWS; i++) {
    const row=[];
    for(let j=0; j < COLS; j++) {
        row.push(false);
    }
    screen.push(row);
}

function display() {
    console.log(screen.map(row => row.map( v => v ? '#' : ' ').join('')).join("\n"));
}

function count() {
    let count = 0
    screen.forEach(row => row.forEach( v => count += v ? 1 : 0));
    return count;
}

const rectRE = /rect (\d+)x(\d+)/;
const rotRowRE = /rotate row y=(\d+) by (\d+)/;
const rotColRE = /rotate column x=(\d+) by (\d+)/;

for (let line of input) {
    let m;
    if (m=rectRE.exec(line)) {
        const x=Number(m[1]);
        const y=Number(m[2]);

        for(let i=0; i< y; i++) {
            for(let j=0; j<x; j++) {
                screen[i][j]=true;
            }
        }

    } else if (m=rotRowRE.exec(line)) {
        const r = Number(m[1]);
        const n = Number(m[2]);

        for (let j=0; j<n; j++) {
            let last=screen[r][COLS - 1];
            for(let i=0; i<COLS; i++) {
                const tmp = screen[r][i];
                screen[r][i]=last;
                last = tmp;
            }
        }
    } else if (m=rotColRE.exec(line)) {
        const c = Number(m[1]);
        const n = Number(m[2]);

        for (let j=0; j<n; j++) {
            let last=screen[ROWS - 1][c];
            for(let i=0; i<ROWS; i++) {
                const tmp = screen[i][c];
                screen[i][c]=last;
                last = tmp;
            }
        }
    } else {
        console.log(`Unknown: ${line}`);
    }
    /*
    display();
    console.log('------------');
    */
}

display();
console.log(count());
