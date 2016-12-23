#!/usr/bin/env node

const crypto = require('crypto');

const input = 'pgflpeqp';
//const input = 'ihgpwlah';

function md5(x) {
    return crypto.createHash('md5').update(x).digest('hex');
}

const DIRS = ['U','D','L','R'];
function getOpen(path) {
    return md5(input + path).substr(0,4).split('').map((d,i) => parseInt(d,16) > 10 ? DIRS[i] : false).filter(x=>x);
}

let queue = [{x: 0, y: 0, path: ''}];

while(queue.length > 0) {
    const next = queue.shift();
    for(let dir of getOpen(next.path)) {
        let nx = next.x;
        let ny = next.y;
        if (dir == 'U' && nx > 0) {
            nx--;
        } else if (dir === 'D' && nx < 3) {
            nx++;
        } else if (dir === 'L' && ny > 0) {
            ny--;
        } else if (dir === 'R' && ny < 3) {
            ny++;
        }

        if (nx === 3 && ny === 3) {
            console.log(`Solution ${next.path.length + 1} ${queue.length} ${next.path + dir}`);
        } else {
            queue.push({
                x: nx,
                y: ny,
                path: next.path + dir,
            });
        }
    }
}

            




