#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split('\n');
input.pop();

var ing = [];

input.forEach(line => {
    var f = line.split(':');
    var qs = f[1].trim().split(',');
    ing.push(qs.map(q => Number(q.trim().split(' ')[1])));
});

//ing.forEach(i => i.pop());

function* partitions(count, total) {
    if (count === 1) {
        yield [total];
    } else {
        for(var i=0; i<= total; i++) {
            var subparts = partitions(count-1,total-i);
            for(var next=subparts.next(); !next.done; next=subparts.next()) {
                yield [i].concat(next.value);
            }
        }
    }
}

function score(part, ing) {
    var subscores = Array(ing[0].length).fill(0);
    for(var i = 0; i< part.length; i++) {
        for(var j=0; j< subscores.length; j++) {
            subscores[j] += part[i] * ing[i][j];
        }
    }

    var result = 1;
    var cals = subscores.pop();
    subscores.forEach(s => result *= Math.max(0,s));
    result *= (cals === 500) ? 1 : 0;
    return result;
}


var parts = partitions(ing.length, 100);

var highScore = 0;
var highPart = [];

for (var part = parts.next(); !part.done; part = parts.next()) {
    //console.log('Scoring: ' + part.value);
    var s = score(part.value,ing);
    if (s > highScore) {
        highScore = s;
        highPart = part.value;
    }
}

console.log(highScore);
console.log(highPart);

    
