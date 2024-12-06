import { readFile } from "../lib/readFile.ts";

const data = await readFile("input").then(data => data.split("\n\n")); // read the file and split it on the blank line

const rules: Map<number, number[]> = new Map();
data[0].split("\n").map(row => row.split("|").map(Number))
    .forEach(([key, value]) => {
        if (rules.has(key)) {
            rules.get(key)?.push(value);
        } else {
            rules.set(key, [value]);
        }
    });
