import { readFileSync } from 'fs'

// const input = readFileSync('example.txt', 'utf-8').trim();
const input = readFileSync('input.txt', 'utf-8').trim();

const blocks = input.split('\n\n');

const seeds = [];
const map = {};

blocks.forEach(block => {
    const parts = block.split(':').map(p => p.trim());
    if ( parts[0] === 'seeds' ) {
        seeds.push(...parts[1].split(/\s+/).map(s => parseInt(s)));
    } else {
        const resource = parts[0].match(/to-(.*)\s/)[1];
        const lines = parts[1].split('\n');
        map[resource] = [];
        lines.forEach(line => {
            const [ destinationStart, sourceStart, rangeLength ] =
                line.split(/\s+/).map(n => parseInt(n))

            map[resource].push({ destinationStart, sourceStart, rangeLength });
        })
    }
});

function lookup(destination, source) {
    for (let i = 0; i < map[destination].length; i++) {
        const range = map[destination][i];
        if(source >= range.sourceStart && source <= range.sourceStart + range.rangeLength) {
            return range.destinationStart + (source - range.sourceStart);
        }
    }

    return source;

}

const getSeedData = (seed) => {
    const soil = lookup('soil', seed);
    const fertilizer = lookup('fertilizer', soil);
    const water = lookup('water', fertilizer);
    const light = lookup('light', water);
    const temperature = lookup('temperature', light);
    const humidity = lookup('humidity', temperature);
    const location = lookup('location', humidity);
    // console.log({soil, fertilizer, water, light, temperature, humidity, location})
    return {soil, fertilizer, water, light, temperature, humidity, location}
}

let lowestLocation = Infinity;

function processSeed(seed) {
    const data = getSeedData(seed);
    lowestLocation = Math.min(lowestLocation, data.location);
}

seeds.forEach(seed => processSeed(seed));

console.log('part 1:', lowestLocation);

lowestLocation = Infinity;

for (let i = seeds[0]; i < seeds[0] + seeds[1]; i++) {
    processSeed(i);
}
for (let i = seeds[2]; i < seeds[2] + seeds[3]; i++) {
    processSeed(i);
}

console.log('part 2:', lowestLocation);
