#!/usr/bin/env node

var input = 'ckczppom';
var crypto = require('crypto');

function md5(inp) {
    return crypto.createHash('md5').update(inp).digest("hex");
}

var i = 0;

sum = md5(input + i);
while (sum.substr(0,6) != '000000') {
    i++;
    sum = md5(input + i);
}

console.log(i);

