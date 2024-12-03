import { readFile } from "../lib/readFile.ts";

const data = await readFile("input");
const twoDArray: number[][] = data.split("\n").map(row => row.split(" ").map(Number));
const day2Part1Result = twoDArray.reduce((acc, row) => {
    return checkIfSafe(row) ? acc + 1 : acc;
}, 0); 

function checkIfSafe(row: number[]): boolean {
    let direction: string = "";
    let last_direction: string = "";

    for (let i = 0; i < row.length - 1; i++) {
        last_direction = direction;
        row[i] < row[i+1] ? direction = "up" : direction = "down";
        if (i != 0 && direction !== last_direction) {
            return false;
        }
        if (Math.abs(row[i] - row[i+1]) > 3 || Math.abs(row[i] - row[i+1]) < 1) { 
            return false;
        }
    }
    return true;
}

const day2Part2Result = twoDArray.reduce((acc, row) => {
    return checkIfSafeProblemLevel(row) ? acc + 1 : acc;
}, 0); 

function checkIfSafeProblemLevel(row: number[]): boolean {
    for (let i = 0; i < row.length; i++) {
        const newRow = [...row.slice(0, i), ...row.slice(i+1)];
        if (checkIfSafe(newRow)) {
            return true;
        }
    }
    return false;
}

console.log("Part 1 Answer: ", day2Part1Result);
console.log("Part 2 Answer: ", day2Part2Result);