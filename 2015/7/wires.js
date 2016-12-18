#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split("\n");

var wires={};

var opRe = /^(.*) -> (\w+)/;

var ops = {
    NOT: (x,y) => (~x) & 65535,
    AND: (x,y) => x & y,
    RSHIFT: (x,y) => x >> y,
    LSHIFT: (x,y) => (x << y) & 65535,
    OR: (x,y) => x | y,
    VAL: (x,y) => x
};

input.forEach(line => {
    var m = opRe.exec(line);
    if (m) {
        var args = m[1].split(/\s+/);
        var wire;
        if (args.length == 1) {
            wire= {
                op: 'VAL',
                x: args[0],
                y: 0
            };
        } else if (args.length == 2 && args[0] === 'NOT') {
            wire = {
                op: 'NOT',
                x: args[1],
                y: 0
            };
        } else {
            wire = {
                op: args[1],
                x: args[0],
                y: args[2]
            };
        }

        wire.resolved = false;

        wires[m[2]] = wire;
    } else {
        console.log('Line not found: ' + line);
    }
});

function resolve(label) {
    console.log('Resolving ' + label);
    if (isNaN(label)) {
        var wire = wires[label];
        if (!wire) {
            console.log('Wire not found: ' + label);
        }
        console.log(wire);
        if (!wire.resolved) {
            var x = resolve(wire.x);
            var y = resolve(wire.y);
            wire.value = ops[wire.op](x,y);
            wire.resolved = true;
            console.log(`${label}: ${wire.x}(${x}) ${wire.op} ${wire.y}(${y}) -> ${wire.value}`);
        } else {
            console.log(`${label}: ${wire.x} ${wire.op} ${wire.y} -> ${wire.value}`);
        }
        return wire.value;
    } else {
        return Number(label);
    }
}

var b = resolve('a');
console.log(b);

for(wire in wires) {
    wires[wire].resolved = false;
}

wires.b.resolved = true;
wires.b.value = b;

console.log(resolve('a'));

