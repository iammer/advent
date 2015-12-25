#!/usr/bin/env node

var input = JSON.parse(require('fs').readFileSync('input','utf8'));

function sumNumbers(input) {
    var result =0;
    if (Array.isArray(input)) {
        input.forEach(x => result += sumNumbers(x));
    } else if (typeof input === "object") {
        var keys = Object.keys(input);
        for (var key in input) {
            if (input[key] === 'red') {
                return 0;
            }
        }
        keys.forEach(x => result += sumNumbers(input[x]));
    }  else if (typeof input === "number") {
        result = input;
    }
    return result;
}

console.log(sumNumbers(input));
        
