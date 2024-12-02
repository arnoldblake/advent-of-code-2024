import { readFile } from "../lib/readFile.ts";

const data = await readFile("input");
const splitData = data.split("\n");

const a: number[] = [],b: number[] = [];

for (const row in splitData) {
    const [x, y] = splitData[row].split("   ");
    a.push(parseInt(x));
    b.push(parseInt(y));
}

a.sort((a, b) => a - b);
b.sort((a, b) => a - b);

let c = 0;

for (let i = 0; i < a.length; i++) {
    c += (Math.abs(a[i] - b[i]));
}

console.log("Part 1 Answer: ", c);

c = 0;
for (let i = 0; i < a.length; i++) {
    let hits = 0;
    for (let x = 0; x < b.length; x++) {
        if (a[i] === b[x]) {
            hits++;
        }
    }
    c += a[i] * hits;
    hits = 0;
}

console.log("Part 2 Answer: ", c);