#!/usr/bin/env node

function dragon(a) {
    return a.concat(['0']).concat(a.map(x => x === '1' ? '0' : '1').reverse());
}

function dragonT(a) {
    return dragon(a.split('')).join('');
}

function check1(x) {
    const result = [];
    for(let i=0;i<x.length;i+=2) {
        result.push(x[i] === x[i+1] ? '1' : '0');
    }
    return result;
}

function check(x) {
    while(x.length % 2 === 0) {
        x = check1(x);
        //console.log(`E: ${x.join('')}`);
    }
    return x;
}

function checkT(x) {
    return check(x.split('')).join('');
}

function assert(actual, expected, message) {
    if (expected !== actual) {
        console.log(`Expected ${actual} to be ${expected}: ${message}`);
    }
}

assert(dragonT('1'),'100','C1');
assert(dragonT('0'),'001','C2');
assert(dragonT('11111'),'11111000000','C3');
assert(dragonT('111100001010'),'1111000010100101011110000','C4');
assert(checkT('110010110100'),'100','C5');
assert(puzzle('10000',20),'01100','C6');

function puzzle(input,fill) {
    let x = input.split('');
    //console.log(`I: ${x.join('')}`);
    while (x.length < fill) {
        x=dragon(x);
        //console.log(`D: ${x.join('')}`);
    }
    //console.log(`S: ${x.slice(0,fill).join('')}`);
    return check(x.slice(0,fill)).join('');
}

console.log(puzzle('10001110011110000',272));
console.log(puzzle('10001110011110000',35651584));










