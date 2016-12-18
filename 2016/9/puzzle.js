#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('input','utf-8');
input.replace(/\s/g,'');

const markerRE = /(\d+)x(\d+)/;

function decompress(line) {
    const lineIn = line.split('');
    if (lineIn[line.length - 1] === "\n") {
        lineIn.pop();
    }
    let result = '';
    let isMarker = false;
    let marker='';
    for(let i = 0; i < lineIn.length; i++) {
        //console.log(`c: ${lineIn[i]}`);
        //console.log(`isMarker: ${isMarker}`);
        if (isMarker) {
            if (lineIn[i] === ')') {
                //console.log(`endMarker: ${marker}`);
                const m = markerRE.exec(marker);
                const chars = Number(m[1]);
                const repeatCount = Number(m[2]);

                const repeatedSection = lineIn.slice(i+1, i+chars+1).join('');
                //console.log(`chars: ${chars}`);
                //console.log(`repeatCount: ${repeatCount}`);
                //console.log(`repeatedSection: ${repeatedSection}`);

                for (let j = 0; j < repeatCount; j++) {
                    result += repeatedSection;
                }

                i+=chars
                isMarker = false;
                marker = '';
            } else {
                marker += lineIn[i];
            }
        } else if (lineIn[i] === '(') {
            //console.log('Start marker');
            isMarker = true;
        } else {
            result += lineIn[i];
        }

    }

    return result;
}

function decompress2(line) {
    const lineIn = line.split('');
    if (lineIn[line.length - 1] === "\n") {
        lineIn.pop();
    }
    let result = 0;
    let isMarker = false;
    let marker='';
    for(let i = 0; i < lineIn.length; i++) {
        //console.log(`c: ${lineIn[i]}`);
        //console.log(`isMarker: ${isMarker}`);
        if (isMarker) {
            if (lineIn[i] === ')') {
                //console.log(`endMarker: ${marker}`);
                const m = markerRE.exec(marker);
                const chars = Number(m[1]);
                const repeatCount = Number(m[2]);

                result += (repeatCount * decompress2(lineIn.slice(i+1, i+chars+1).join('')));

                i+=chars
                isMarker = false;
                marker = '';
            } else {
                marker += lineIn[i];
            }
        } else if (lineIn[i] === '(') {
            //console.log('Start marker');
            isMarker = true;
        } else {
            result++;
        }

    }

    return result;
}

function check(i) {
    const o = decompress(i);
    console.log(`${i} ${o} ${o.length}`);
}

/*
[
    'ADVENT',
    'A(1x5)BC',
    '(3x3)XYZ',
    'A(2x2)BCD(2x2)EFG',
    '(6x1)(1x3)A',
    'X(8x2)(3x3)ABCY'
].forEach(check); 
*/


const out = decompress(input);
console.log(out.length);

console.log(decompress2(input));
