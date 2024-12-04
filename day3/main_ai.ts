import { readFile } from "../lib/readFile.ts";

const data = await readFile("input");
const mults: number[][] = [];

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
let match;

while ((match = regex.exec(data)) !== null) {
    const [x, y] = match.slice(1).map(Number);
    mults.push([x, y]);
}

const part1Result = mults.reduce((acc, [x, y]) => acc + x * y, 0);
console.log("Part 1 Answer: ", part1Result);