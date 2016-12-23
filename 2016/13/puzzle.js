#!/usr/bin/env node

const input = 1352;

function isWall(x,y) {
    let n = x*x + 3*x + 2*x*y + y + y*y + input;

    let bitCount = 0;
    while(n > 0) {
        if (n & 1 === 1) {
            bitCount++;
        }
        n>>=1;
    }

    return bitCount % 2 ==1;
}

const steps = [];
for (let i=0; i<100; i++) {
    const row = [];
    for (let j=0; j<100; j++) {
        row.push(0);
    }
    steps.push(row);
}

const distance = Object.create(null);
const queue = [ {x: 1, y: 1, steps: 0} ];

function getCache(x,y) {
    return distance[`${x},${y}`];
}

function setCache(x,y,v) {
    distance[`${x},${y}`]=v;
}

setCache(1,1,0);
while(queue.length > 0) {
    const next = queue.shift();
    if (next.x === 31 && next.y === 39) {
        console.log(`Solution: Steps: ${next.steps}`);
    }

    addToQueue(next.x-1,next.y,next.steps + 1);
    addToQueue(next.x+1,next.y,next.steps + 1);
    addToQueue(next.x,next.y-1,next.steps + 1);
    addToQueue(next.x,next.y+1,next.steps + 1);
}

function addToQueue(nx,ny,s) {
    if (nx > 0 && ny > 0 && nx < 100 && ny < 100) {
        if (getCache(nx,ny) === undefined) {
            if (isWall(nx,ny)) {
                setCache(nx,ny,Math.Infinity);
            } else {
                setCache(nx,ny,s);
                queue.push({x: nx, y: ny, steps: s});
            }
        }
    }
}

function pad(x) {
    if (x < 10) {
        return " " + x;
    } else {
        return x;
    }
}


let rows = [];
for(let i=0;i<50;i++) {
    rows.push(i);
}

console.log('XX:' + rows.map(pad).join('|'));
for(let i=0;i<50;i++) {
    console.log(pad(i) + ':' + rows.map(j => {
        const v = getCache(i,j);
        if (v === Math.Infinity) {
            return '  ';
        } else {
            return pad(v%100);
        }
    }).join('|'));
}


