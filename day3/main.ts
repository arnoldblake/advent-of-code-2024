import { readFile } from "../lib/readFile.ts";

// We need to parse the file input for correct mult instructions
// mult instructions take the form mul(x,y) where x and y are integers
// however the input data is corrupted and may not contain complete
// or correct mult instructions.

const data = await readFile("input");
let mults: number[][] = [];

for (let i = 0; i < data.length; i++) {
    const chunk = data.slice(i, i + 4);
    if (chunk === "mul(") {
        for (let x = i + 4; x < data.length; x++) {
            const a = data[x];
            if (isNaN(Number(a)) && a != "," && a != ")") {
                break;
            }
            if (a === ")") {
                mults.push(data.slice(i + 4, x ).split(",").map(Number));
                break;
            }
        }
    }
}

const part1Result = mults.reduce((acc, [x, y]) => acc + x * y, 0);
console.log("Part 1 Answer: ", part1Result);    