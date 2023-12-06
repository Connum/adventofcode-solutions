import { readFileSync } from 'fs'

const input = readFileSync('1.txt', 'utf-8');

const lines=input.split('\n')

const words = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

let result = 0

const matches = Object.keys(words).join('|') + '|\\d';
const rxEnd = new RegExp(`(${matches})$`, 'g');
const rxStart = new RegExp(`^(${matches})`, 'g');

lines.forEach((line, i) => {
    let num1;
    let num2;

    for(var i = 1; i<=line.length; i++) {
        const start = line.substring(0, i);
        const match = start.match(rxEnd);
        if (match) {
            num1 = match[0]
            break;
        }
    }
    for(var i = 1; i<=line.length; i++) {
        const end = line.substring(line.length-i, line.length);
        const match = end.match(rxStart);
        if (match) {
            num2 = match[0]
            break;
        }
    }
    num1 = words[num1] || num1;
    num2 = words[num2] || num2;
    result += parseInt(`${num1}${num2}`)
}) 

console.log(result);