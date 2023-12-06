import { readFileSync } from 'fs'

const input = readFileSync('1.txt', 'utf-8');

const lines=input.split('\n')


let result = 0

lines.forEach(line => {
    const num1 = line.match(/^[^0-9]*(\d)/)[1]??''
    const num2 = line.match(/(\d)[^0-9]*$/)[1]??''

    result += parseInt(`${num1}${num2}`)
}) 

console.log(result);