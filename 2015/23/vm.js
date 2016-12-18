#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");
input.pop()

var reg = { a: 1, b: 0};

var pc = 0;

var instRE = /(\w+) ([ab]|[+-]\d+),? ?([+-]\d+)?/;
while(pc < input.length) {
    console.log(`PC: ${pc}  ${input[pc]}`);
    var m = instRE.exec(input[pc]);
    if (m[1] === 'hlf') {
        reg[m[2]] = Math.floor(reg[m[2]] / 2);
        pc++;
    } else if (m[1] === 'tpl') {
        reg[m[2]] = reg[m[2]] * 3;
        pc ++;
    } else if (m[1] === 'inc') {
        reg[m[2]] = reg[m[2]] + 1;
        pc ++;
    } else if (m[1] === 'jmp') {
        pc += Number(m[2]);
    } else if (m[1] === 'jie') {
        if (reg[m[2]] % 2 === 0) {
            pc += Number(m[3]);
        } else {
            pc++;
        }
    } else if (m[1] === 'jio') {
        if (reg[m[2]] === 1) {
            pc += Number(m[3]);
        } else {
            pc++;
        }
    }
}

console.log(reg);

