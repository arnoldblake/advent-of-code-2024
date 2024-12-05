import { readFile } from "../lib/readFile.ts";

const input = await readFile("input");

const data: string[][] = input.split("\n").map(row => row.split(""));

const word = "XMAS";
const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [1, 1],  // down-right
    [1, -1], // down-left
    [0, -1], // left
    [-1, 0], // up
    [-1, -1],// up-left
    [-1, 1]  // up-right
];

function searchWord(grid: string[][], word: string): number {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function searchDirection(x: number, y: number, dx: number, dy: number): boolean {
        for (let i = 0; i < word.length; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === word[0]) {
                for (const [dx, dy] of directions) {
                    if (searchDirection(r, c, dx, dy)) {
                        console.log(`Found "${word}" starting at (${r}, ${c})`);
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

const count = searchWord(data, word);
console.log(`"${word}" found ${count} times in the grid.`);