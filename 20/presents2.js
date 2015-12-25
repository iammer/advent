#!/usr/bin/env node

var input = 34000000;

var stopAt = input/10;
var houses = new Array(stopAt+1).fill(0);

for(var elf = 1; elf <= stopAt; elf++) {
    var house = elf; 
    for(var visit=0; visit < 50 && house < stopAt; visit++) {
        houses[house] += elf * 11;
        house+=elf;
    }
    //console.log(elf);
}

console.log('-----------------------');

for(var house = 1; house <= stopAt; house++) {
    //console.log(houses[house]);
    if (houses[house] >= input) {
        console.log('FOUND: ' + house + ' ' + houses[house]);
        break;
    }
}

