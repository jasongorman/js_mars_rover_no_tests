const compass = ['N', 'E', 'S', 'W'];

const vectors = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: 1, y: 0}
];

const commands = {
    'R': right,
    'L': left,
    'F': forward,
    'B': back
};

function turn(rover, compass) {
    return {...rover, facing: compass[(directionOf(rover, compass) + 1)]};
}

function right(rover) {
    return turn(rover, compass);
}

function left(rover) {
    return turn(rover, [...compass].reverse());
}

function directionOf(rover, compass) {
    return compass.indexOf(rover.facing);
}

function forward(rover) {
    return {
        ...(rover),
        x: rover.x + vectors[directionOf(rover, compass)].x,
        y: rover.y + vectors[directionOf(rover, compass)].y
    };
}

function back(rover) {
    return {
        ...(rover),
        x: rover.x - vectors[(directionOf(rover, compass))].x,
        y: rover.y - vectors[(directionOf(rover, compass))].y
    };
}

function go(instructions, rover){
    return [...instructions].reduce((r, instruction) => command(instruction)(r), rover);
}

function command(instruction) {
    if(!instruction in commands){
        throw new Error('Instruction ' + instruction + ' not recognised')
    }
    return commands[instruction];
}

module.exports = go;