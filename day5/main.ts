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

function isValidSequence(pages: number[], rules: Map<number, number[]>): boolean {
    // Check each page in sequence
    for (let i = 0; i < pages.length; i++) {
        const currentPage = pages[i];
        
        // If page has rules/dependencies
        if (rules.has(currentPage)) {
            const dependencies = rules.get(currentPage)!;
            
            // Check each dependency
            for (const dependentPage of dependencies) {
                // Get index of dependent page
                const dependentIndex = pages.indexOf(dependentPage);
                
                // If dependent page exists and comes before current page, sequence invalid
                if (dependentIndex !== -1 && dependentIndex <= i) {
                    return false;
                }
            }
        }
    }
    return true;
}

let day5Part1Result = 0;
// Check each sequence in queue
for (const pages of productionQueue) {
    if (isValidSequence(pages, productionRules)) {
        // Handle invalid sequence
        day5Part1Result += pages[Math.floor(pages.length / 2)];
    }
    // Process valid sequence
}

console.log("Part 1 Answer: ", day5Part1Result);