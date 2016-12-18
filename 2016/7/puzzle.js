#!/usr/bin/env node

const fs = require('fs');


const input = fs.readFileSync('input','utf-8').split('\n');
input.pop();


/*
const input = [
    'abba[mnop]qrst',
    'abcd[bddb]xyyx',
    'aaaa[qwer]tyui',
    'ioxxoj[asdfgh]zxcvbn'
];
*/

/*
const input = [
    'aba[bab]xyz',
    'xyx[xyx]xyx',
    'aaa[kek]eke',
    'zazbz[bzb]cdb'
];
*/

function supportsTLS(addr) {
    const chars = addr.split('');

    let valid = false;
    let brackets = false;

    for(let i=0; i < chars.length; i++) {
        if (chars[i] === '[') {
            brackets = true;
        } else if (chars[i] === ']') {
            brackets =false;
        } else if (i>2 && chars[i-3] === chars[i] && chars[i-2] === chars[i-1] && chars[i] !== chars[i-1]) {
            if (brackets) {
                return false;
            } else {
                valid = true;
            }
        }
    }

    return valid;
}

function supportsSSL(addr) {
    const chars = addr.split('');

    const abas = [];
    const babs = [];

    let brackets = false;

    for(let i=0; i < chars.length; i++) {
        if (chars[i] === '[') {
            brackets = true;
        } else if (chars[i] === ']') {
            brackets =false;
        } else if (i>1 && chars[i-2] === chars[i] && chars[i] !== chars[i-1]) {
            if (brackets) {
                babs.push([chars[i], chars[i-1]]);
            } else {
                abas.push([chars[i-1], chars[i]]);
            }
        }
    }

    for (let aba of abas) {
        for(let bab of babs) {
            if (aba[0] === bab[0] && aba[1] === bab[1]) {
                return true;
            }
        }
    }

    return false;
}



let countTLS=0;
let countSSL=0;
for (let line of input) {
    console.log(`${line}: ${supportsTLS(line)} ${supportsSSL(line)}`);
    if (supportsTLS(line)) {
        countTLS++;
    }

    if (supportsSSL(line)) {
        countSSL++;
    }
}

console.log(countTLS);
console.log(countSSL);
            


    

