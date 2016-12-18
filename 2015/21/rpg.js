#!/usr/bin/env node

var fs = require('fs');

function loadFile(name) {
    var file = fs.readFileSync(name,'utf8').split("\n");
    file.pop();
    return file.map(line => {
        var props = line.split(/\s+/);
        return {
            name: props[0],
            cost: Number(props[1]),
            damage: Number(props[2]),
            armor: Number(props[3])
        };
    });
}

function copy(o) {
    var result = {};
    for(k of Object.keys(o)) {
        result[k]=o[k];
    }
    return result;
}

var weapons = loadFile('weapons');
var armor = loadFile('armor');
armor.push({
    name: 'None',
    cost: 0,
    damage: 0,
    armor: 0
});
var rings = loadFile('rings');
rings.push({
    name: 'None',
    cost: 0,
    damage: 0,
    armor: 0
});

var configs = [];

weapons.forEach( w => configs.push({
    weapon: w.name,
    cost: w.cost,
    damage: w.damage,
    armor: w.armor
}));

var pConfigs = configs;
configs= [];


armor.forEach( a => {
    pConfigs.forEach( c => {
        var n = copy(c);
        n.cost = n.cost + a.cost;
        n.damage = n.damage + a.damage;
        n.armor = n.armor + a.armor;
        n.wear = a.name;
        configs.push(n);
    });
});

pConfigs = configs;
configs = [];


rings.forEach( a => {
    pConfigs.forEach( c => {
        var n = copy(c);
        n.cost = n.cost + a.cost;
        n.damage = n.damage + a.damage;
        n.armor = n.armor + a.armor;
        n.rhand = a.name;
        configs.push(n);
    });
});

pConfigs = configs;
configs = [];

rings.forEach( a => {
    pConfigs.forEach( c => {
        if (c.rhand === 'None' || c.rhand !== a.name) {
            var n = copy(c);
            n.cost = n.cost + a.cost;
            n.damage = n.damage + a.damage;
            n.armor = n.armor + a.armor;
            n.lhand = a.name;
            configs.push(n);
        }
    });
});



function sim(c) {
    var you = 100;
    var boss = 103;
    var damage = 9;
    var armor = 2;

    var youDh = Math.max(c.damage - armor, 1);
    var bossDh = Math.max(damage - c.armor, 1);
    var youTurns = Math.ceil(boss/youDh);
    var bossTurns = Math.ceil(you/bossDh);
    //console.log(youDh);
    //console.log(bossDh);
    //console.log(boss/youDh);
    //console.log(you/bossDh);

    return youTurns <= bossTurns;
}

//var sortedConfigs = configs.sort( (a,b) => a.cost - b.cost);
var sortedConfigs = configs.sort( (a,b) => b.cost - a.cost);

for(var i = 0; i < sortedConfigs.length; i++) {
    if (!sim(sortedConfigs[i])) {
        console.log(sortedConfigs[i]);
        break;
    }
}
