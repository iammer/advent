#!/usr/bin/env node

const itemsRequired = 10;
const initial = {
    previous: false,
    steps: 0,
    elevator: 0,
    floors: [
        [{
            material: 'polonium',
            type: 'generator'
        }, {
            material: 'thulium',
            type: 'generator'
        }, {
            material: 'thulium',
            type: 'microchip'
        }, {
            material: 'promethium',
            type: 'generator'
        }, {
            material: 'ruthenium',
            type: 'generator'
        }, {
            material: 'ruthenium',
            type: 'microchip'
        }, {
            material: 'cobalt',
            type: 'generator'
        }, {
            material: 'cobalt',
            type: 'microchip'

        }], [{
            material: 'polonium',
            type: 'microchip'
        }, {
            material: 'promethium',
            type: 'microchip'

        }], [], []
    ]
}

/*
const itemsRequired = 4;
const initial = {
    previous: false,
    steps: 0,
    elevator: 0,
    floors: [
        [{
            material: 'hydrogen',
            type: 'microchip'
        }, {
            material: 'lithium',
            type: 'microchip'
        }],
        [{
            material: 'hydrogen',
            type: 'generator'
        }],
        [{
            material: 'lithium',
            type: 'generator'
        }],
        []
    ]
};
*/

const previousStates = [];
let stateQueue = [initial];

function possibleChildren(state) {
    const possibleItems = getPossibleItems(state.floors[state.elevator]);
    const possibleStates = [];

    for(let pos of getPossibleElevators(state)) {
        for(let itemSet of possibleItems) {
            possibleStates.push({
                previous: state,
                steps: state.steps + 1,
                elevator: pos,
                floors: state.floors.map((floor, i) => {
                    if (i === state.elevator) {
                        return floor.filter(x => !itemSet.includes(x));
                    } else if (i === pos) {
                        return floor.concat(itemSet);
                    } else {
                        return floor.slice();
                    }
                })
            });
        }
    }

    return possibleStates;
}

function getPossibleElevators(state) {
    if (state.elevator === 0) {
        return [1];
    } else if (state.elevator === 3) {
        return [2];
    } else {
        return [state.elevator - 1, state.elevator + 1];
    }
}

function getPossibleItems(floor) {
    const possibleItems = floor.map(x => [x]);

    for(let i=0; i < floor.length -1; i++) {
        for(let j=i+1; j < floor.length; j++) {
            possibleItems.push([floor[i],floor[j]]);
        }
    }

    return possibleItems;
}

function getType(floor, type) {
    return floor.filter( x => x.type === type ).map(x => x.material);
}

function isFloorValid(floor) {
    const generators = getType(floor, 'generator');

    if (generators.length === 0) {
        return true;
    }

    const microchips = getType(floor, 'microchip');

    for (let microchip of microchips) {
        if (!generators.includes(microchip)) {
            return false;
        }
    }

    return true;
}

function isStateValid(state) {
    const isValid = state.floors.every(isFloorValid);
    //displayState(state);
    //console.log(isValid ? 'VALID' : 'INVALID');
    return isValid;
}


function isFloorSame(a,b) {
    if (a.length != b.length) {
        return false;
    }

    return a.every( c => b.includes(c) );
}

function isStateSame(a,b) {
    if (a.elevator != b.elevator) {
        return false;
    }

    return a.floors.every((f,i) => isFloorSame(f,b.floors[i]));
}

function alreadyChecked(state) {
    return previousStates.some(s => isStateSame(s,state));
}

function isSolution(state) {
    return state.elevator === 3 && state.floors[3].length === itemsRequired;
}

function countSteps(state) {
    return state.steps;
    /*
    if (state.previous) {
        return countSteps(state.previous) + 1;
    } else {
        return 0;
    }
    */
}

function displayFloor(floor) {
    return floor.map(item => `${item.material}-${item.type}`).join(',');
}

function displaySolution(state) {
    if (state.previous) {
        displaySolution(state.previous);
    }
    displayState(state);
}

function displayState(state) {
    console.log('-------------------------');
    console.log(`Elevator at: ${state.elevator + 1}`);
    state.floors.forEach((floor, i) => {
        console.log(`Floor ${i+1}: ${displayFloor(floor)}`);
    });
}


let statesChecked = 0;
while (stateQueue.length > 0) {
    const state = stateQueue.shift();
    //displayState(state);

    if (isSolution(state)) {
        stateQueue = [];
        displaySolution(state);
        console.log(`Solution in ${countSteps(state)}`);
    }

    possibleChildren(state).filter(isStateValid).filter(s => !alreadyChecked(s)).forEach(s => {
        stateQueue.push(s);
        previousStates.push(s);
    });

    statesChecked++;
    if (statesChecked % 1000 === 0) {
        console.log(`States Checked: ${statesChecked}, State Queue: ${stateQueue.length}, previousStates: ${previousStates.length}, steps: ${state.steps}`);
    }

}


