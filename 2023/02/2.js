import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf-8');

const lines=input.split('\n')

const games = [];

lines.forEach(line => {
    const parts1 = line.split(':');
    const draws = parts1[1].split(';');
    const game = {
        id: parseInt(parts1[0].match(/\d+/)[0]),
        red: 0,
        green: 0,
        blue: 0
    }

    const matches = parts1[1].matchAll(/(\d+)\s(red|blue|green)/g);
    for ( const match of matches ) {
        const color = match[2];
        const count = parseInt(match[1])
        if ( game[color] < count ) {
            game[color] = count;
        }
    }
    
    games.push(game)
});

console.log(games.reduce((prev, cur, i) => {
    return prev + (cur.red * cur.green * cur.blue);
}, 0))