#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");
input.pop();

var sues = [];

var sueRE = /^Sue (\d+): (.*)$/;

input.forEach(line => {
    var m = sueRE.exec(line);
    if (m) {
        var sue = { num: Number(m[1])};
        var props = m[2].split(',');
        props.forEach(prop => {
            var s = prop.trim().split(': ');
            sue[s[0]] = Number(s[1]);
        });
        sues[Number(m[1])] = sue;
    }
});

var known = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

var possible=sues;
var match = [];

for(prop in known) {
    var val = known[prop];
    possible.forEach( sue => {
        if (typeof sue[prop] === 'undefined') {
            match.push(sue);
        } else {
            if (prop === 'trees' || prop === 'cats') {
                if (sue[prop] > val) {
                    match.push(sue);
                }
            } else if (prop === 'pomeranians' || prop === 'goldfish') {
                if (sue[prop] < val) {
                    match.push(sue);
                }
            } else {
                if (sue[prop] === val) {
                    match.push(sue);
                }
            }
        }
    });
    possible=match;
    match=[];
}

console.log(possible);



