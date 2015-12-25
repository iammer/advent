#!/usr/bin/env node

var spells = [
    {
        name: "Poison",
        cost: 173,
        effect: {
            name: "Poison",
            timer: 6,
            damage: 3,
        }
    },
    {
        name: "Magic Missle",
        cost: 53,
        damage: 4
    },
    {
        name: "Drain",
        cost: 73,
        damage: 2,
        heal: 2
    },
    {
        name: "Shield",
        cost: 113,
        effect: {
            name: "Shield",
            timer: 6,
            armor: 7
        }
    },
    {
        name: "Recharge",
        cost: 229,
        effect: {
            name: "Recharge",
            timer: 5,
            mana: 101
        }
    }
].reverse();

function clone(o) {
    var r = {};
    for (k of Object.keys(o)) {
        if (k === 'effects') {
            r[k] = o[k].map(x => clone(x));
        } else if (k === 'spellList') {
            r[k] = o[k].slice();
        } else {
            r[k] = o[k];
        }
    }
    return r;
}

var bossDamage = 9;

var states = [{
    manaSpent: 0,
    spellList: [],
    turn: 0,
    boss: 58,
    you: 50,
    mana: 500,
    armor: 0,
    effects: []
}];

var victoryStates = [];

var minMana = 9999;
var minState = {};
function checkBoss(state) {
    if (state.boss <= 0) {
        if (minMana > state.manaSpent) {
            minMana = state.manaSpent;
            minState = state;
        }
    }
}

while(states.length > 0) {
    var state = states.pop();
    //console.log(state);
    state.armor = 0;
    state.effects = state.effects.filter(e => {
        e.timer--;
        if (e.armor) {
            state.armor = e.armor;
        }
        if (e.damage) {
            state.boss -= e.damage;
            checkBoss(state);
        }
        if (e.mana) {
            state.mana += e.mana;
        }
        return e.timer > 0;
    });


    if (state.turn % 2 === 0) {
        spells.forEach(spell => {
            if (spell.cost <= state.mana && state.manaSpent + spell.cost < minMana) {
                if (!spell.effect || !state.effects.some(e => e.name === spell.name)) {
                    var newState = clone(state);
                    //newState.you--;
                    newState.turn++;
                    newState.spellList.push(spell.name);
                    newState.manaSpent += spell.cost;
                    newState.mana -= spell.cost;
                    if (spell.damage) {
                        newState.boss -= spell.damage;
                        checkBoss(newState);
                    }
                    if (spell.heal) {
                        newState.you += spell.heal;
                    }
                    if (spell.effect) {
                        newState.effects.push(clone(spell.effect));
                    }
                    if (newState.you > 0) {
                        states.push(newState);
                    }
                }
            }
        });
    } else {
        state.turn++;
        state.you -= Math.max(1,bossDamage-state.armor);
        if (state.you > 0) {
            states.push(state)
        }
    }

}

console.log(minState);
