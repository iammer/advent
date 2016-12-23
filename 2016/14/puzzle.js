#!/usr/bin/env node

const crypto = require('crypto');

const input = 'ihaygndm';
//const input = 'abc';

const stretch = 2017;
function hash(n) {
    let x = input + n;
    for(let i=0;i<stretch;i++) {
        x = crypto.createHash('md5').update(x).digest('hex');
    }
    return x;
}

function has5(s,d) {
    return s.includes(d + d + d + d + d);
}

function get5s(s) {
    return ['0','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'].filter( d => has5(s,d) );
}

function firstTriple(s) {
    const d = s.split('');
    for(let i = 0; i < d.length - 2; i++) {
        if (d[i] === d[i+1] && d[i] === d[i+2]) {
            return d[i];
        }
    }

    return false;
}


const keys = [];
const possible = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
let index = 0;

while(keys.length < 64 || keys[63] + 1000 > index) {
    const md5 = hash(index);
    for(let d of get5s(md5)) {
        //console.log(`Found quint ${d} @ ${index}`);
        let h = parseInt(d,16);
        for(let p of possible[h]) {
            if (p + 1001 >= index) {
                console.log(`Found key at: ${p}`);
                keys.push(p);
            }
        }
        possible[h] = [];
    }

    const t = firstTriple(md5);
    if (t) {
        //console.log(`Found triple ${t} @ ${index}`);
        const h = parseInt(t,16);
        possible[h].push(index);
    }

    index++;
}

keys.sort((a,b) => a-b);
console.log(keys[63]);

