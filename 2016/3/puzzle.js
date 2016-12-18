#!/usr/bin/env node

const fs=require('fs');

const input=fs.readFileSync('input','utf-8').split("\n");
input.pop()

let count = 0;

function checkTriangle(edges) {
    edges.sort((a,b) => a-b);

    if (edges[0] + edges[1] > edges[2]) {
        return 1;
    } else {
        return 0;
    }
}

const lengths = input.map(line => line.trim().split(/\s+/).map(x => Number(x)));

lengths.forEach(x => count += checkTriangle(x.slice()));

console.log(count);

count = 0;

for(let i=0; i < lengths.length; i+=3) {

    for(let j=0; j<3; j++) {
        const edges = [];
        for(let k=0; k<3; k++) {
            edges.push(lengths[i+k][j]);
        }
        count += checkTriangle(edges.slice());
    }

}

console.log(count);




