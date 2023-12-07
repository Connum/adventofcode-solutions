import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf-8');

const lines=input.split(/\r?\n/)

let possibleGears = {};
let result = 0;

let connectedGears = {};
let buffer = '';
let isPartNumber = false;

const processBuffer = () => {
    if ( buffer.length && isPartNumber ) {
        Object.keys(connectedGears).forEach(coords => {
            if ( !possibleGears[coords] ) {
                possibleGears[coords] = [];
            }
            possibleGears[coords].push(parseInt(buffer));
        });
    }
    buffer = '';
    connectedGears = {};
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
                { coords: `${n - 1}|${i-1}`, char: lines?.[n - 1]?.[i-1] }, { coords: `${n - 1}|${i}`, char: lines?.[n - 1]?.[i] }, { coords: `${n - 1}|${i+1}`, char: lines?.[n - 1]?.[i+1] },
                { coords: `${n    }|${i-1}`, char: lines?.[n    ]?.[i-1] },                                                         { coords: `${n    }|${i+1}`, char: lines?.[n    ]?.[i+1] },
                { coords: `${n + 1}|${i-1}`, char: lines?.[n + 1]?.[i-1] }, { coords: `${n + 1}|${i}`, char: lines?.[n + 1]?.[i] }, { coords: `${n + 1}|${i+1}`, char: lines?.[n + 1]?.[i+1] },
            ];
            let gearLookup = lookaround.filter(c => c.char && c.char === '*');
            if ( gearLookup.length ) {
                gearLookup.forEach(l => connectedGears[l.coords] = true);
            }
            isPartNumber = isPartNumber || !!gearLookup.length;
        } else {
            processBuffer();
        }
        
    }
})
processBuffer();

Object.values(possibleGears).forEach(g => {
    if ( g.length !== 2 ) return;
    result += g[0] * g[1];
})

console.log(result);