import { readFile } from "../lib/readFile.ts";

const data: string = await readFile("input");
const splitData: string[] = data.split("\n");

const arrayA: number[] = [], arrayB: number[] = [];

// Parse input data into two arrays
for (const row of splitData) {
    const [x, y] = row.split("   ");
    arrayA.push(parseInt(x));
    arrayB.push(parseInt(y));
}

// Sort both arrays
arrayA.sort((a, b) => a - b);
arrayB.sort((a, b) => a - b);

// Calculate Part 1 result
const part1Result: number = arrayA.reduce((acc, val, idx) => acc + Math.abs(val - arrayB[idx]), 0);

console.log("Part 1 Answer: ", part1Result);

// Calculate Part 2 result using a map for optimization
const bCountMap: Map<number, number> = new Map();

for (const num of arrayB) {
    bCountMap.set(num, (bCountMap.get(num) || 0) + 1);
}

const part2Result: number = arrayA.reduce((acc, val) => acc + (bCountMap.get(val) || 0) * val, 0);

console.log("Part 2 Answer: ", part2Result);