import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf-8');

const lines=input.split(/\r?\n/)

let result = 0;

let buffer = '';
let isPartNumber = false;

const processBuffer = () => {
    if ( buffer.length && isPartNumber ) {
        result += parseInt(buffer);
    }
    buffer = '';
    isPartNumber = false;
};

lines.forEach((line, n) => {
    processBuffer();
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i]
        
        if ( char === '.' ) {
            processBuffer();
        } else if (!isNaN(parseInt(char))) {
            buffer += char;
            
            const lookaround = [
                lines?.[n - 1]?.[i-1], lines?.[n - 1]?.[i], lines?.[n - 1]?.[i+1],
                lines?.[n    ]?.[i-1],                      lines?.[n    ]?.[i+1],
                lines?.[n + 1]?.[i-1], lines?.[n + 1]?.[i], lines?.[n + 1]?.[i+1],
            ];
            isPartNumber = isPartNumber || !!lookaround.filter(c => c && (c !== '.' ) && (isNaN(parseInt(c)))).length;
        } else {
            isPartNumber = true;
            processBuffer();
        }
        
    }
})
processBuffer();

console.log(result)