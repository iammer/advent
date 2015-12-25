#!/usr/bin/env node

var input = require('fs').readFileSync('input','utf8').split(/\n/);

var links = {};

var linkRE = /(\w+) to (\w*) = (\d+)/;

input.forEach(line => {
    var m = linkRE.exec(line);
    if (m) {
        if (!links[m[1]]) {
            links[m[1]] = {};
        }
        if (!links[m[2]]) {
            links[m[2]] = {};
        }
        links[m[1]][m[2]]=Number(m[3]);
        links[m[2]][m[1]]=Number(m[3]);
    }
});

var stops = Object.keys(links);

function permutate(paths) {
    if (paths.length === 1) {
        return [{path: paths, distance: 0}];
    } else {
        var result = [];
        for (var i=0; i < paths.length; i++) {
            var subPath = paths.slice(0,paths.length);
            var removed = subPath.splice(i,1);
            var d=links[removed[0]];
            /*
            console.log('removed',removed);
            console.log('subPath',subPath);
            console.log('d',d);
            */
            permutate(subPath).forEach(perm => {
                /*
                console.log('perm',perm);
                console.log(d[perm.path[0]]);
                */
                result.push({
                    path: removed.concat(perm.path),
                    distance: d[perm.path[0]] + perm.distance
                })
            });

        }
        return result;
    }
}

var paths = permutate(stops);

var shortest = {path: [], distance: 9999999};
var longest = {path: [], distance: 0};

paths.forEach(path => {
    if (path.distance < shortest.distance) {
        shortest = path;
    }
    if (path.distance > longest.distance) {
        longest = path;
    }
});

//console.log(paths);
console.log(shortest);
console.log(longest);


                        


