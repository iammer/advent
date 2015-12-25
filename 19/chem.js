#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split('\n');
input.pop();

var initial = input.pop();
input.pop();

var inRe = /^(\w+) => (\w+)$/;

var replacements = input.map(line => {
    var m = inRe.exec(line);
    return {
        in: m[1],
        out: m[2]
    };
}).sort((a,b) => b.out.length - b.out.length);

var results = new Set();

function replace(orig, inC, outC, next) {
    i = orig.indexOf(inC);
    while(i>=0) {
        //console.log(inC);
        var newM =orig.slice(0,i) + outC + orig.slice(i+inC.length); 
        if (newM === 'e') {
            running=false;
            console.log('FOUND: ' + newM);
        }
        next.add(newM);
        i = orig.indexOf(inC, i+1);
    }
}

/*
replacements.forEach(r => replace(initial, r.in, r.out));

console.log(results.size);
*/

/*
while(running) {
    steps++;
    console.log(steps);
    var next = new Set();
    results.forEach(m => replacements.forEach(r => replace(m, r.out, r.in, next)));
    results=next
    console.log(results.size);
    break;
}
*/

var stack = [{
    steps: 0,
    word: initial
}];

var go = true;

var maxSteps = 0;
while(go) {
    var o = stack.pop();
    if (o.steps > maxSteps) {
        maxSteps = o.steps;
        console.log(maxSteps);
    }
    replacements.forEach(r => {
        var orig=o.word;
        i = orig.indexOf(r.out);
        while(i>=0) {
            var newM =orig.slice(0,i) + r.in + orig.slice(i+r.out.length); 
            if (newM === 'e') {
                go=false;
                console.log('FOUND: ',o,r);
            }
            stack.push({
                steps: o.steps +1,
                word: newM
            });
            i = orig.indexOf(r.out, i+1);
        }
    });
}




