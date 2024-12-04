import * as fs from 'fs';
import path from 'path';
console.log(__dirname);
const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8');

let acc = 0;
let enabled = true;
let mulRegex = /(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;
for (let m of data.matchAll(mulRegex)) {
    let operand = m[1].split('(')[0];
    switch (operand) {
        case 'do':    
            enabled = true;
            break;
        case "don't":
            enabled = false;
            break;
        case 'mul':
            if (enabled) {
                acc += parseInt(m[2]) * parseInt(m[3]);
            }
            break;
    }
}

console.log(acc);
