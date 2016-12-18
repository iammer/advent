#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");
input.pop();

var inChars = 0;
var escChars = 0;
var outChars = 0;

function escape(s) {
    var result = '"';
    for (var i=0; i<s.length; i++) {
        var c = s.substr(i,1);
        if (c === '"') {
            result += '\\"';
        } else if (c === '\\') {
            result += "\\\\";
        } else {
            result += c;
        }
    }
    result += '"';

    console.log(`${s} ===> ${result}`);
    if (unescape(result) !== s) {
        console.log('WARN WARN WARN MISMATCH');
    }
    return result;
}

function unescape(s) {
    var result = '';
    for(var i = 0; i< s.length; i++) {
        var c = s.substr(i,1);
        if (c === '"') {
            if (i > 0 && i < s.length-1) {
                console.log(`Bad escape [1]: ${s} ${i}`);
            }
        } else if (c === '\\') {
            if ( i === s.length-1 ) {
                console.log('Bad escape2: ' + s);
            }
            i++;
            var e = s.substr(i,1);
            if (e === 'x') {
                i+=2;
                var h = Number.parseInt(s.substr(i,2),16);
                result += String.fromCodePoint(h);
            } else {
                result += e;
            }
        } else {
            result += c;
        }
    }

    console.log(`${s} => ${result}`);
    return result;
}

input.forEach(line => {
    inChars += line.length;
    escChars += unescape(line).length;
    outChars += escape(line).length;
});

console.log(inChars);
console.log(escChars);
console.log(outChars);
console.log(inChars - escChars);
console.log(outChars - inChars);
