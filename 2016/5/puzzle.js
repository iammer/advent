#!/usr/bin/env node

const crypto = require('crypto');

const input = 'wtnhxymk';

function md5(name) {
    return crypto.createHash('md5').update(name).digest("hex");
}

let i = 0;
let password = '';
let password2 = [];
let complete = false

while (!complete) {
    const hash = md5(input + i);
    if (hash.substr(0,5) === '00000') {
        console.log(hash);
        if (password.length < 8) {
            password += hash.substr(5,1);
        }

        const pos = Number(hash.substr(5,1));
        const c = hash.substr(6,1);

        if (pos < 8) {
            if (!password2[pos]) {
                password2[pos] = c;
            }
            complete=true;
            for(let i=0; i<8; i++) {
                complete = complete & password2[i];
            }
            console.log(password2.join('|'));
        }

    }
    i++;
}

console.log(password);
console.log(password2.join(''));


