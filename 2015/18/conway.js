#!/usr/bin/env node

var SIZE = 100;

var input = require('fs').readFileSync('input','utf8').split('\n');
input.pop();

var lights = [];

input.forEach(line => {
    lights.push(line.split('').map(l => l === '#' ? 1 : 0));
});

function neighborCount(x, y) {
    var result = 0;
    for(var i = Math.max(0,x-1); i <= Math.min(SIZE-1,x+1); i++) {
        for(var j = Math.max(0, y-1); j <= Math.min(SIZE-1, y+1); j++) {
            if (i!==x || j!==y) {
                //console.log(`${x},${y}: ${i},${j}`);
                result += lights[i][j];
            }
        }
    }
    return result;
}

function stick() {
    lights[0][0] = 1;
    lights[0][SIZE-1] = 1;
    lights[SIZE-1][0] = 1;
    lights[SIZE-1][SIZE-1] = 1;
}

function iterate(a) {
    var result = [];
    for(var i = 0; i<SIZE; i++) {
        var row = [];
        result[i] = row;
        for(var j = 0; j<SIZE; j++) {
            var n = neighborCount(i,j);
            if (lights[i][j] === 1) {
                if (n===2 || n===3) {
                    row[j] = 1;
                } else {
                    row[j] = 0;
                }
            } else {
                if (n===3) {
                    row[j] = 1;
                } else {
                    row[j] = 0;
                }
            }
        }
    }
    return result;
}

var add = (a,b) => a+b;
var count = a => a.map(x => x.reduce(add)).reduce(add);

var display = a => a.map( r => r.map( l => l ? '#' : '.' ).join('')).join("\n");

stick()
if (SIZE < 10) {
    console.log(display(lights));
}

for(var i = 0; i< SIZE; i++) {
    lights = iterate(lights);
    stick();
    if (SIZE < 10) { 
        console.log('-------------');
        console.log(display(lights));
    };
}

console.log(count(lights));
