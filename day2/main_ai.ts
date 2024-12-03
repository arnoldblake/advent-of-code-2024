
import { readFile } from "../lib/readFile.ts";

const data = await readFile("input");
const twoDArray: number[][] = data.split("\n").map(row => row.split(" ").map(Number));

const day2Part1Result = twoDArray.filter(checkIfSafe).length;
const day2Part2Result = twoDArray.filter(checkIfSafeProblemLevel).length;

function checkIfSafe(row: number[]): boolean {
    let previousDirection: string | null = null;
    for (let i = 0; i < row.length - 1; i++) {
        const direction = row[i] < row[i + 1] ? "up" : "down";
        if (previousDirection !== null && direction !== previousDirection) return false;
        previousDirection = direction;
        if (Math.abs(row[i] - row[i + 1]) > 3 || Math.abs(row[i] - row[i + 1]) < 1) return false;
    }
    return true;
}

function checkIfSafeProblemLevel(row: number[]): boolean {
    return row.some((_, i) => checkIfSafe([...row.slice(0, i), ...row.slice(i + 1)]));
}

console.log("Part 1 Answer: ", day2Part1Result);
console.log("Part 2 Answer: ", day2Part2Result);