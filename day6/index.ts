import { readFile } from "../lib/readFile.ts";
import { part1 } from "./main_ai_fresh.ts";

const input = await readFile("input");
console.log("Part 1:", part1(input));
