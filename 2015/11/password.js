#!/usr/bin/env node

var input = 'hxbxwxba';

function increment(p) {
    var pw = p.split('').reverse()
    for (var i = 0; i < input.length; i++) {
        if (pw[i] !== 'z') {
            pw[i] = String.fromCharCode(pw[i].charCodeAt(0) + 1);
            return pw.reverse().join('');
        } else {
            pw[i] = 'a';
        }
    }
    pw.push('a');
    return pw.reverse().join('');
}

function isValid(p) {
    var pw = p.split('').map(x => x.charCodeAt(0));
    return hasAscending(pw) && hasPairs(pw) && !hasForbidden(pw);
}

var forbidden = ['i','o','l'].map(x => x.charCodeAt(0));
function hasForbidden(pw) {
    for(var i=0; i< forbidden.length; i++) {
        if (pw.indexOf(forbidden[i]) >= 0) {
            return true;
        }
    }
    return false;
}

function hasPairs(pw) {
    var pairCount = 0;
    for (var i=0; i< pw.length - 1; i++) {
        if (pw[i] === pw[i+1]) {
            i++;
            pairCount++;
            if (pairCount === 2) {
                return true;
            }
        }
    }
    return false;
}

function hasAscending(pw) {
    for (var i=0; i<pw.length - 2; i++) {
        if (pw[i] + 1 === pw[i+1] && pw[i] + 2 === pw[i + 2]) {
            return true;
        }
    }
    return false;
}


var passwords = 0;
while(passwords < 2) {
    while(!isValid(input)) {
        input = increment(input);
    }

    console.log(input);
    passwords++;
    input = increment(input);
}
