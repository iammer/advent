#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input','utf-8').split('\n');
input.pop();

const regs = {a: 0, b: 0, c: 1, d: 0};
const instrs = input.map(line => line.split(' '));
let ip = 0;

function getVal(v) {
    const n = Number(v);
    if (Number.isNaN(n)) {
        return regs[v];
    } else {
        return n;
    }
}

while (ip < instrs.length) {
    const instr = instrs[ip];
    const op = instr[0];

    /*
    console.log(regs);
    console.log(`${ip}: ${instr.join(' ')}`);
    console.log();
    */

    if (op === 'cpy') {
        regs[instr[2]]=getVal(instr[1]);
        ip++;
    } else if (op === 'inc') {
        regs[instr[1]]++;
        ip++;
    } else if (op === 'dec') {
        regs[instr[1]]--;
        ip++;
    } else if (op === 'jnz') {
        if (getVal(instr[1]) !== 0) {
            ip+=Number(instr[2]);
        } else {
            ip++;
        }
    }
}

console.log(regs);

        


