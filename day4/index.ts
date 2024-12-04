import * as fs from 'fs';
import path from 'path';
console.log(__dirname);
const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8');

const rows = data.split('\n')
const maxX = rows[0].length;
const maxY = rows.length;
const directions = [-1,0,1]
let found = 0;
let foundXDash = 0;

console.log(maxX, maxY);

for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        findXMAS(x,y)
        findXDashMAS(x,y)
    }
}

function findXMAS(startX: number, startY: number) {
    directions.forEach(dx => {
        directions.forEach(dy => {
            // using x/y deltas, incrementally build a word
            let path = "";
            let x = startX;
            let y = startY;
            // skip 0/0 coordinates. Really this takes care of itself because we'll just build
            // up a string of the same letter until XMAS doesn't start with it
            if (dx === 0 && dy === 0) {
                return;
            }
            while ("XMAS".startsWith(path)) {
                path += rows[y][x];
                if (path === "XMAS") {  
                    console.log(`Found XMAS at ${startX},${startY} with dx=${dx}, dy=${dy}`);

                    found++;
                    break
                }
                x += dx;
                y += dy;
                if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
                    break;
                }
            }
        });
    });
}

function isMAS(startX: number, startY: number, dx: number, dy: number) {
    const str = rows[startY+dy][startX+dx] + rows[startY][startX] + rows[startY-dy][startX-dx]
    return str === "MAS" || str === "SAM";
}

function inBounds(x: number, y: number) {
    return x >= 1 && x < maxX - 1 && y >= 1 && y < maxY - 1;
}

function findXDashMAS(startX: number, startY: number) {
    // start from the center of the X
    if (rows[startY][startX] !== 'A') {
        return;
    }
    if (!inBounds(startX, startY)) {
        return
    }
    // check for MAS on perpendicular axes
    if (isMAS(startX, startY, 1, 1) && isMAS(startX, startY, -1, 1)) {
            console.log(`Found XDashMAS at ${startX},${startY}`);
            // log grid for debugging
            // console.log(`${rows[startY-1][startX-1]}.${rows[startY-1][startX+1]}`);
            // console.log(`.${rows[startY][startX]}.`);
            // console.log(`${rows[startY+1][startX-1]}.${rows[startY+1][startX+1]}`);
            foundXDash++;
    }
}

console.log(`Found ${found} XMAS`);
console.log(`Found ${foundXDash} XDashMAS`);
