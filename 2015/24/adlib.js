#!/usr/bin/env node

var fs = require('fs');
var readline = require('readline');

function* permutate(a, n) {
    n = n || a.length;
    if (n === 1) {
        for(var i in a) {
            yield [a[i]];
        }
    } else {
        for(var i in a) {
            var c = a.slice();
            var f = c.splice(i, 1);
            for(var subPerm of permutate(c, n-1)) {
                yield subPerm.concat(f);
            }
        }
    }
}

function* combinate(a, n, start) {
    start = start || 0;
    if (n===1) {
        for (var i=start; i<a.length; i++) {
            yield [a[i]];
        }
    } else {
        for(var i = start; i <= a.length - n; i++) {
            for (var subCombo of combinate(a, n-1, i+1)) {
                yield subCombo.concat(a[i]);
            }
        }
    }
}

function* allSubSets(a, start) {
    start = start || 0;
    var f = a[start];
    if (a.length === start + 1) {
        yield [];
        yield [f];
    } else {
        for(var subSet of allSubSets(a, start+1)) {
            yield subSet;
            yield subSet.concat(f);
        }
    }
}

function* map(g,f) {
    for (x of g) {
        yield f(x);
    }
}

function* filter(g, f) {
    f = f || (x => x);
    for (x of g) {
        if (f(x)) {
            yield x;
        }
    }
}

function* first(g, n) {
    for(var i=0, x=g.next(); i < n && !x.done; i++, x=g.next()) {
        yield x.value;
    }
}

function* count() {
    for(var i = 0; true; i++) {
        yield i;
    }
}

function iterToArray(g) {
    var result = [];
    for (x of g) {
        result.push(x);
    }
    return result;
}

function displayIter(it) {
    console.log('-------------------');
    for(x of it) {
        console.log(x);
    }
}

function cbToRIter(it) {
    var result = {done: false};
    return function(x) {
        if (!result.done) {
            result = it.next(x);
        }
    }
}

function inputRIter(file, it) {
    file = file || 'input';
    var rl = readline.createInterface({
        input: fs.createReadStream(file)
    });


    rl.on('line',cbToRIter(it()));
}

function RIterBridge() {
    var iter = function* () {
        while(true) {
            riter.next(yield);
        }
    };
    var riter = function* () {
        while(true) {
            iter.next(yield);
        }
    };
    return {
        riter: riter,
        iter: iter
    }
}

function* inputIter(file) {
    
    yield* goBetween(inputRIter(file, r

inputIter('adlib.js',function* (){
    while(true) {
        console.log(yield);
    }
});

/*
displayIter(combinate([1,2,3,4], 3));
displayIter(permutate([1,2,3,4], 3));
displayIter(filter(first(map(count(),x => x*3), 7), x => x%2 === 0));
*/

//displayIter(allSubSets([1,2,3,4,5]));


