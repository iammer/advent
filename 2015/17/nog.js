#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split('\n');
input.pop();

var input = input.map(x => Number(x));

function allSubsets(l) {
    if (l.length === 1) {
        return [l, []];
    }

    var copy = l.slice();

    var first = copy.pop();

    var result = [];
    for(l of allSubsets(copy)) {
        result.push(l);
        result.push([first].concat(l));
    }
    return result;
}


    
    
function check(l) {
    return l.length === 0 ? 0 : l.reduce((x,y) => x+y ) === 150;
}

var minSize = input.length;
var minSet = [];

var subs = allSubsets(input).filter(check);

subs.forEach(s => {
    if (s.length < minSize) {
        minSize = s.length;
        minSet = s;
    }
});

console.log(subs.length);
console.log(subs.filter(s => s.length === minSize).length);

console.log(minSize);

