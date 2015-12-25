#!/usr/bin/env node

var input = 34000000;

var i = 0;

var go = true;
var maxPresents = 0;
while(go) {
    i++;
    var presents = 0;
    for (var j=1;j<=i;j++) {
        if (i%j===0) {
            presents += j*10;
        }
    }
    //console.log(`House ${i} got ${presents} presents.`);
    if (presents > maxPresents) {
        maxPresents = presents;
        console.log(maxPresents);
    }

    if (presents >= input) {
        console.log('FOUND' + i + ' ' + presents);
        go = false;
    }
}

