#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");

console.log('Initing...');
var lights = [];
for(var i=0; i<1000; i++) {
    lights[i] = [];
    var cur = lights[i];
    for (var j=0; j<1000;j++) {
        cur[j]=0;
    }
}

console.log(lights[300][205]);


var re = /(.*) (\d+),(\d+) through (\d+),(\d+)/;

var ops = {
    'turn on': (x,y) => {lights[x][y]++;},
    'turn off': (x,y) => {lights[x][y] = Math.max(0,lights[x][y]-1);},
    'toggle': (x,y) => {lights[x][y]+=2;}
};

console.log('Performing ops');
input.forEach(line => {
    var m = re.exec(line);
    if (m) {
        //console.log(line);
        var op = ops[m[1]];
        var startx = Math.min(m[2],m[4]);
        var stopx = Math.max(m[2],m[4]);
        var starty = Math.min(m[3],m[5]);
        var stopy = Math.max(m[3],m[5]);
        for(i = startx; i<=stopx; i++) {
            for (j=starty; j<=stopy; j++) {
                //console.log(`${m[1]} ${i},${j}`);
                op(i,j);
            }
        }
    }
});

var count = 0;
for(var i=0; i<1000; i++) {
    for (var j=0; j<1000;j++) {
        count += lights[i][j];
    }
}

console.log(count);



