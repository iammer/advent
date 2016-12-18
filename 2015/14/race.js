#!/usr/bin/env node

var raceTime = 2503;

var input=require('fs').readFileSync('input','utf8').split("\n");
input.pop();

var inputRE = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;

var deer = [];

input.forEach(line => {
    var m = inputRE.exec(line);
    if (m) {
        deer.push({
            name: m[1],
            speed: Number(m[2]),
            endurance: Number(m[3]),
            rest: Number(m[4]),
            isFlying: true,
            flyTill: Number(m[3]),
            restTill: 0,
            at: 0,
            points: 0
        });
    }
});

for(var i = 0; i < raceTime; i++) {
    deer.forEach(d => {
        if (d.isFlying) {
            if (i >= d.flyTill) {
                d.isFlying = false;
                d.restTill = i + d.rest;
            }
        } else if (i >= d.restTill) {
            d.isFlying = true;
            d.flyTill = i + d.endurance;
        }
        if (d.isFlying) {
            d.at += d.speed;
        }
    });
    findLeader('at').points++;
}

function findLeader(prop) {
    var first = {};
    first[prop]=0;

    deer.forEach(d => { if (d[prop] > first[prop]) { first = d } });
    return first;
}

console.log(findLeader('at'));
console.log(findLeader('points'));
