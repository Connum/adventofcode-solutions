import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf-8');

const lines=input.split('\n')

const games = [];

lines.forEach(line => {
    const parts1 = line.split(':');
    const numbers = parts1[1].split('|');
    const winning = numbers[0].split(/\s+/).filter(Boolean);
    const having = numbers[1].split(/\s+/).filter(Boolean);
    
    const game = {
        id: parseInt(parts1[0].match(/\d+/)[0]),
        winners: having.filter(value => winning.includes(value))
    }
    
    games.push(game)
});

console.log(games.reduce((prev, cur, i) => {
    if ( cur.winners.length ) {
        return prev + Math.pow(2, cur.winners.length - 1);
    }
    return prev;
}, 0))