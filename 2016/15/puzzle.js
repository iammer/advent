#!/usr/bin/env node

const discs = [
    [13, 2],
    [5, 0],
    [17, 6],
    [3, 0],
    [7, 5],
    [19, 2],
    [11,0]
];

let done = false;
let t = 0;

while (!done) {
    if (fallsThrough(t)) {
        done=true;
        console.log(t-1);
    }
    t++;
}

function fallsThrough(t) {
    return discs.every((d,i) => (t+i) % d[0] === d[1]);
}

