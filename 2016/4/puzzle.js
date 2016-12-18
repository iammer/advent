#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input','utf-8').split('\n');
input.pop();
/*
const input = [
    'aaaaa-bbb-z-y-x-123[abxyz]',
    'a-b-c-d-e-f-g-h-987[abcde]',
    'not-a-real-room-404[oarel]',
    'totally-real-room-200[decoy]'
];
*/

const parseRE = /(.+)-(\d+)\[(\w+)\]/;

function decrypt(name,id) {
    return name.split('').map(l => {
        if (l === '-') {
            return ' ';
        } else {
            return String.fromCharCode(((l.charCodeAt(0) - 97 + id) % 26) + 97);
        }
    }).join('');
}

function parse(line) {
    const m = parseRE.exec(line);

    return {
        original: line,
        name: m[1],
        id: Number(m[2]),
        checksum: m[3],
        computedChecksum: checksum(m[1]),
        decrypedName: decrypt(m[1],Number(m[2]))
    }
}

function checksum(name) {
    const noDash = name.replace(/-/g,'');
    const counted = countLetters(noDash);
    //console.log(counted)
    return Object.keys(counted).sort((a,b) => {
        const ac = counted[a];
        const bc = counted[b];

        if (ac === bc) {
            return a.localeCompare(b);
        } else {
            return bc - ac;
        }
            
    }).slice(0,5).join('');
}

function countLetters(name) {
    const result = {};
    for (let letter of name.split('')) {
        if (result[letter]) {
            result[letter]++;
        } else {
            result[letter]=1;
        }
    }

    return result;
}


//console.log(input.map(parse).map(JSON.stringify).join('\n'));
const realRooms = input.map(parse).filter(x => x.checksum === x.computedChecksum);
console.log(realRooms.map(x => x.id).reduce((a,b) => a+b));
console.log(realRooms.find(x => x.decrypedName === 'northpole object storage').id);
