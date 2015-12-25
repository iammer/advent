#!/usr/bin/env node

var input='3113322113';

function process(s) {
    var last = '';
    var count = 1;
    var result = '';
    for (var i = 0; i< s.length; i++) {
        var c = s.substr(i,1)
        if ( c === last) {
            count++;
        } else {
            if (last !== '') {
                result += String(count) + last;
                count = 1;
            }
            last = c;
        }
    }
    return result + String(count) + last;
}

var t = input;
for(var i=0; i< 40; i++) {
    t = process(t);
}
console.log(t.length);
for(var i=0; i< 10; i++) {
    t = process(t);
}
console.log(t.length);

