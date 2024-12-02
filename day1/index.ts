import * as fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'data-1a.txt'), 'utf8');

let left: number[] = [];
let right: number[] = [];

let distance = 0;
data.split('\n').forEach(line => {
    const [leftStr, rightStr] = line.split(/\s+/);    
    left.push(parseInt(leftStr));
    right.push(parseInt(rightStr));
});

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b);
let similarity = 0;
for (let i = 0; i < left.length; i++) {
    distance += Math.abs(left[i] - right[i]);
    for (let j = 0; j < right.length; j++) {
        if (left[i] === right[j]) {
            similarity += left[i];
        }
    }
}
console.log(`Distance: ${distance}`);
console.log(`Similarity: ${similarity}`);