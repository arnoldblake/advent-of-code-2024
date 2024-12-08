import { readFile } from "../lib/readFile.ts";

const input = await readFile("input");
const map = input.split("\n").map((row) => row.split(""));
const directions = ["^", ">", "v", "<"];
const moves = {
  "^": { x: 0, y: -1 },
  ">": { x: 1, y: 0 },
  "v": { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
};

function getInitPos(map: string[][]): { x: number; y: number } | undefined {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (directions.includes(map[y][x])) {
        return { x, y };
      }
    }
  }
  return undefined;
}

function turnRight(direction: string): string {
  return directions[(directions.indexOf(direction) + 1) % 4];
}

function makeMove(
  pos: { x: number; y: number },
  direction: "^" | ">" | "v" | "<",
): { x: number; y: number } | undefined {
  const newPos = {
    x: pos.x + moves[direction].x,
    y: pos.y + moves[direction].y,
  };
  if (
    newPos.y < 0 || newPos.y >= map.length || newPos.x < 0 ||
    newPos.x >= map[0].length
  ) {
    return undefined; // Guard leaves the map
  }
  if (map[newPos.y][newPos.x] === "#") {
    map[pos.y][pos.x] = turnRight(direction);
    return pos;
  } else {
    map[newPos.y][newPos.x] = direction;
    map[pos.y][pos.x] = "X";
    return newPos;
  }
}

let pos = getInitPos(map);
if (!pos) throw new Error("Initial position not found");

while (pos) {
  const direction = map[pos.y][pos.x];
  pos = makeMove(pos, direction as "^" | ">" | "v" | "<");
}

const count = map.flat().filter((cell) => cell === "X").length;
console.log("Part 1 Answer: ", count);
