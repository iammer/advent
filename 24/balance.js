#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");
input.pop();

input = input.map(x => Number(x));

function* combinate(a, n, start) {
    start = start || 0;
    if (n===1) {
        for (var i=start; i<a.length; i++) {
            yield [a[i]];
        }
    } else {
        for(var i = start; i <= a.length - n; i++) {
            for (var subCombo of combinate(a, n-1, i+1)) {
                yield subCombo.concat(a[i]);
            }
        }
    }
}


var add = (x,y) => x+y;
var mult = (x,y) =>x*y;

var sum = input.reduce(add);
var target = sum/4;

var count = 1;
var entangle = Infinity;
var best = null

function setBest(combo) {
    count = combo.length;
    entangle = calcEntangle(combo);
    best = combo;
}

var calcEntangle = c => c.reduce(mult)

console.log(target);
while(!best && count < input.length / 3) {
    console.log(count);
    for(combo of  combinate(input,count)) {
        //console.log(combo);
        var w = combo.reduce(add);
        //console.log(w);
        if (w === target && calcEntangle(combo) < entangle) {
            setBest(combo);
        }
    }
    count++;
}

console.log(count);
console.log(entangle);
console.log(best);

    
