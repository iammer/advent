#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");

var total = 0;
input.forEach(present => {
    if (present.length > 0) {
        console.log(present);
        var d = present.split('x').map(x => Number(x)).sort((a,b) => a-b);
        console.log(d);

        for (var i=0;i<2;i++) {
            for (var j=i+1; j<3;j++) {
                total += d[i] * d[j] * 2;
            }
        }

        total += d[0] * d[1];
        console.log(total);
    }
});

