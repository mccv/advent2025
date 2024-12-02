import * as fs from 'fs';
import path from 'path';
console.log(__dirname);
const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8');

let numSafe = 0;

let safe = function (levels: number[]): boolean {
    // determine direction the expensive way
    const dir = levels[1] - levels[0];
    
    let safe = true;
    levels.forEach((level, index) => {
        if (index !== 0) {
            const delta = level - levels[index - 1];
            if (delta * dir <= 0) {
                safe = false;
                return;
            }
            if (Math.abs(delta) < 1 || Math.abs(delta) > 3) {
                safe = false;
                return;
            }
        }
    });
    return safe;
}

data.split('\n').forEach(line => {
    const levels = line.split(/\s+/).map(level => parseInt(level));
    if (levels.length !== 0) {
        let isSafe = safe(levels);
        if (!isSafe) {
            for (let i = 0; i < levels.length; i++) {
                let levelTest = [...levels];
                levelTest.splice(i, 1);
                if (safe(levelTest)) {
                    isSafe = true;
                    break;
                }
            }
        }
        if (isSafe) {
            numSafe++;
        }
    }
});

console.log(`Number of safe reports: ${numSafe}`);
