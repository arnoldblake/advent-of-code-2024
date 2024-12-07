import { readFile } from "../lib/readFile.ts";

const data = await readFile("input").then(data => data.split("\n\n")); // read the file and split it on the blank line

const productionRules: Map<number, number[]> = new Map();
data[0].split("\n").map(row => row.split("|").map(Number))
    .forEach(([key, value]) => {
        if (productionRules.has(key)) {
            productionRules.get(key)?.push(value);
        } else {
            productionRules.set(key, [value]);
        }
    });

const productionQueue = data[1].split("\n").map(row => row.split(",").map(Number));

for (const pages of productionQueue) {
    for (const page of pages) {
        if (productionRules.has(page)) {
            const rules = productionRules.get(page);
            if (rules) {
                for (const rule of rules) {
                    if (!pages.includes(rule)) break;
                }
            }
        }
    }
}

