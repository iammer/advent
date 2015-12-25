#!/usr/bin/env node

function next(x) {
    return (x * 252533) % 33554393;
}

var i = 1;
var j = 1;

var x = 20151125
while (i!=2978 || j!=3083) {
    if (i==1) {
        i=j+1
        j=1
    } else {
        i--;
        j++;
    }

    x = next(x);

}
console.log(i)
console.log(j)

console.log(x);

    
    
