#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input','utf8').split("\n");
input.pop();

/*
const input = [
'value 5 goes to bot 2',
'bot 2 gives low to bot 1 and high to bot 0',
'value 3 goes to bot 1',
'bot 1 gives low to output 1 and high to bot 0',
'bot 0 gives low to output 2 and high to output 0',
'value 2 goes to bot 2'
]
*/

const initialRE = /value (\d+) goes to bot (\d+)/;
const compareRE = /bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/;

const bots = [];
const valuesToPush = [];
const outputs = [];

function addOutput(i,v) {
    console.log(`Output ${i} gets ${v}`);
    if (outputs[i]) {
        outputs[i].push(v);
    } else {
        outputs[i] = [v];
    }
}

function pushValue(to, v) {
    if (to.type === 'bot') {
        valuesToPush.push({bot: to.id, value: v});
    } else {
        addOutput(to.id, v);
    }
}

for (let line of input) {
    let m;
    if (m = initialRE.exec(line)) {
        valuesToPush.push({bot: Number(m[2]), value: Number(m[1])});
    } else if (m = compareRE.exec(line)) {
        const id = Number(m[1]);
        bots[id] = {
            id: id,
            lowTo: {type: m[2], id: Number(m[3])},
            highTo: {type: m[4], id: Number(m[5])},
            values: []
        };
    } else {
        console.log(`Unknown line: ${line}`);
    }
}

let solved = false;
while (valuesToPush.length > 0) {
    const val = valuesToPush.pop();
    const bot = bots[val.bot];

    if (!bot) {
        console.log(`Unknown bot: ${val.bot}`);
        break;
    }

    console.log(`Bot: ${bot.id} gets ${val.value}`);
    bot.values.push(val.value);
    if (bot.values.length === 2) {
        bot.values.sort((a,b) => a - b);
        console.log(`Bot: ${bot.id} comparing: ${bot.values}`);
        if (bot.values[0] === 17 && bot.values[1] === 61) {
            solved=true;
            console.log(`Solution: ${bot.id}`);
        }

        pushValue(bot.lowTo, bot.values[0]);
        pushValue(bot.highTo, bot.values[1]);

        bot.values = [];
    }
}

console.log(outputs[0][0] * outputs[1][0] * outputs[2][0]);


