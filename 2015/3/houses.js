#!/usr/bin/env node

var input = require('fs').readFileSync('input');

var houses = {}

var x = 0;
var y = 0;

var houseCount = 1;
houses[`${x},${y}`] = 1;

for (var i = 0; i < input.length; i++) {
    var d = input[i];
    if (d === 94) {
        y++;
    } else if (d===118) {
        y--;
    } else if (d === 62) {
        x--;
    } else if (d === 60) {
        x++;
    } else {
        next;
    }

    if (houses[`${x},${y}`]) {
        houses[`${x},${y}`]++;
    } else {
        houses[`${x},${y}`] = 1;
        houseCount++;
    }
}

console.log(houseCount)

