import { readFileSync } from 'fs'

// const input = readFileSync('example.txt', 'utf-8');
const input = readFileSync('input.txt', 'utf-8');

const lines=input.split('\n')

const cards = {};

lines.forEach(line => {
    const parts1 = line.split(':');
    const numbers = parts1[1].split('|');
    const winning = numbers[0].split(/\s+/).filter(Boolean);
    const having = numbers[1].split(/\s+/).filter(Boolean);
    
    const id = parseInt(parts1[0].match(/\d+/)[0]);
    const card = {
        id: id,
        winners: having.filter(value => winning.includes(value))
    }
    cards[id] = card
});

const part1result =Object.values(cards).reduce((prev, cur, i) => {
    if ( cur.winners.length ) {
        return prev + Math.pow(2, cur.winners.length - 1);
    }
    return prev;
}, 0)
console.log('part 1:', part1result)

function createCopies(copies) {
    const newCopies = [];
    copies.forEach(card => {
        for (let i = 1; i <= card.winners.length; i++) {
            const targetCard = cards?.[card.id + i];
            if ( targetCard ) {
                newCopies.push(targetCard);
            }
        }
    })
    if ( newCopies.length ) {
        return [...copies, ...createCopies(newCopies)];
    }
    return [copies, ...newCopies];
}

console.log('part 2:', createCopies(Object.values(cards)).length);