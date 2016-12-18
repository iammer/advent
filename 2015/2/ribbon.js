#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");

var total = 0;
input.forEach(present => {
    if (present.length > 0) {
        console.log(present);
        var d = present.split('x').map(x => Number(x)).sort((a,b) => a-b);
        console.log(d);


        total += 2 * (d[0] + d[1]) + d[0] * d[1] * d[2];;
        console.log(total);
    }
});

