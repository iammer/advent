#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input','utf-8');
//const input = 'ULL\nRRDDD\nLURDL\nUUUUD';

const keypad = [[1,2,3],[4,5,6],[7,8,9]];

let x=1;
let y=1;

console.log(input.split("\n").map(instr => {
    if (instr === '') {
        return '';
    }

    for (step of instr.split('')) {
        if (step === 'U' && x > 0) {
            x--;
        } else if (step === 'D' && x < 2) {
            x++;
        } else if (step === 'L' && y > 0) {
            y--;
        } else if (step === 'R' && y < 2) {
            y++;
        }
        //console.log(`${step}: ${x},${y}`);
    }
    //console.log('----');

    return keypad[x][y];
}).join(''));
            
const keypad2 = [[false, false, 1, false, false], [false,2,3,4,false],[5,6,7,8,9],[false,'a','b','c',false],[false,false,'d',false,false]];

x=2;
y=0;

console.log(input.split("\n").map(instr => {
    if (instr === '') {
        return '';
    }

    for (step of instr.split('')) {
        const oldX = x;
        const oldY = y;
        if (step === 'U' && x > 0) {
            x--;
        } else if (step === 'D' && x < 4) {
            x++;
        } else if (step === 'L' && y > 0) {
            y--;
        } else if (step === 'R' && y < 4) {
            y++;
        }

        if (!keypad2[x][y]) {
            x = oldX;
            y = oldY;
        }
        //console.log(`${step}: ${x},${y}`);
    }
    //console.log('----');

    return keypad2[x][y];
}).join(''));
            

