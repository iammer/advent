#!/usr/bin/env node

var input=require('fs').readFileSync('input','utf8').split("\n");
input.pop();

var inRE = /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)\./;

var prefs = {};

input.forEach(line => {
    var m = inRE.exec(line);
    if (m) {
        if (!prefs[m[1]]) {
            prefs[m[1]] = {Me: 0};
        }
        prefs[m[1]][m[4]] = (m[2] === 'gain') ? Number(m[3]) : -Number(m[3]);
    }
});

var me = {};
Object.keys(prefs).forEach(p => me[p] = 0);
prefs['Me'] = me;



function permutate(l) {
    if (l.length === 1) {
        return l;
    }

    var result = [];
    for(var i=0; i<l.length; i++) {
        var r = l.slice();
        var first = r.splice(i,1)[0];
        
        permutate(r).forEach(p => result.push([first].concat(p)));
    }
    return result;
}

function calcHappy(l) {
    var result = prefs[ l[l.length-1] ] [ l[0] ] + prefs[ l[0] ][ l[l.length-1] ];
    var delta = Math.abs(prefs[ l[l.length-1] ] [ l[0] ]) + Math.abs(prefs[ l[0] ][ l[l.length-1] ]);
    for(var i = 0; i<l.length - 1; i++) {
        var c = prefs[ l[i] ][ l[i+1] ];
        result += c;
        delta += Math.abs(c);
        c = prefs[ l[i+1] ][ l[i] ];
        result += c;
        delta += Math.abs(c);
    }
    return [result,delta];
}


var maxPerm = 0;
var maxHappy = [0,0];

permutate(Object.keys(prefs)).forEach( p => {
    //console.log(p);
    var h = calcHappy(p);
    if (h[0] > maxHappy[0]) {
        maxHappy = h;
        maxPerm = p;
    }
});

console.log(maxPerm);
console.log(maxHappy);

