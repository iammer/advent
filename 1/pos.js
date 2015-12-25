#!/usr/bin/env node

var input = require('fs').readFileSync('input');

var position = 0;

var i=0;
while (position >= 0) {
    if (input[i] === 40) {
        position++;
    } else {
        position--;
    }
    i++;
}

console.log(i);
