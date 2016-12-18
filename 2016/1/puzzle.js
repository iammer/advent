#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input','utf-8');
//const input = 'R5, L5, R5, R3';
//const input = 'R8, R4, R4, R8';

let x=0;
let y=0;
let xDir=0;
let yDir=1;

const locations = {};
let firstDup = false;

function move(step) {
    const tmp = yDir;
    if (step.turn === 'R') {
        yDir = -xDir;
        xDir = tmp;
    } else {
        yDir = xDir;
        xDir = -tmp;
    }

    for (let i = 0; i < step.distance; i++) {
        x += xDir;
        y += yDir;

        const key = `${x},${y}`;
        if (locations[key]) {
            const loc = locations[key];
            if (!firstDup) {
                console.log(`First Dup: ${loc.x}, ${loc.y} distance: ${Math.abs(loc.x) + Math.abs(loc.y)}`);
                firstDup=true;
            }
        } else {
            locations[key]={x: x, y: y};
        }
    }

    //console.log(`turn: ${step.turn}, distance: ${step.distance}, x: ${x}, y: ${y}, xDir: ${xDir}, yDir: ${yDir}`);
}

const steps = input.split(', ').map(step => ({
    turn: step.substring(0,1),
    distance: Number(step.substring(1))
})).forEach(move);

console.log(`x: ${x}, y: ${y}, distance: ${Math.abs(x) + Math.abs(y)}`);



