#!/usr/bin/env node

var check = 83160;

var presents = 0;
for(var i = 1; i<=check; i++) {
    if (check % i === 0) {
        presents += i * 10;
    }
}

console.log(presents);

