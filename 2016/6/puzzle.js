#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input','utf-8').split("\n");
input.pop();

const counts = [];
for(let i=0; i < input[0].length; i++) {
    counts.push({});
}

for (let line of input) {
    const letters = line.split('');
    for(let i = 0; i < letters.length; i++) {
        if (counts[i][letters[i]]) {
            counts[i][letters[i]]++;
        } else {
            counts[i][letters[i]]=1;
        }
    }
}

console.log(counts.map(count => Object.keys(count).sort((a,b) => count[b] - count[a])[0]).join(''));
console.log(counts.map(count => Object.keys(count).sort((a,b) => count[a] - count[b])[0]).join(''));
