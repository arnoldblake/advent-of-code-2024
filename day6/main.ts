import { readFile } from "../lib/readFile.ts";

const input = await readFile("input");
const map = input.split("\n").map((row) => row.split(""));

function getInitPos(map: string[][]): { x: number; y: number } | undefined {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const cell = map[y][x];
      if (cell === "<" || cell === ">" || cell === "^" || cell === "v") {
        return { x: x, y: y };
      }
    }
  }
  return undefined;
}

function makeMove(
  oldPos: { x: number; y: number },
  newPos: { x: number; y: number },
): { x: number; y: number } | undefined {
  if (
    newPos.y < 0 || newPos.y >= map.length || newPos.x < 0 ||
    newPos.x >= map[0].length
  ) {
    return undefined; // Guard leaves the map
  }
  if (map[newPos.y][newPos.x] === "#") {
    // Turn right 90 degrees
    switch (map[oldPos.y][oldPos.x]) {
      case "^":
        map[oldPos.y][oldPos.x] = ">";
        break;
      case "v":
        map[oldPos.y][oldPos.x] = "<";
        break;
      case "<":
        map[oldPos.y][oldPos.x] = "^";
        break;
      case ">":
        map[oldPos.y][oldPos.x] = "v";
        break;
      default:
        throw new Error("Invalid direction");
    }
    return oldPos;
  } else {
    // Move forward
    map[newPos.y][newPos.x] = map[oldPos.y][oldPos.x];
    map[oldPos.y][oldPos.x] = "X";
    return newPos;
  }
}

let pos = getInitPos(map);

if (pos === undefined) {
  throw new Error("Initial position not found");
}

while (pos) {
  switch (map[pos.y][pos.x]) {
    case "^":
      pos = makeMove({ x: pos.x, y: pos.y }, {
        x: pos.x,
        y: pos.y - 1,
      });
      break;
    case "v":
      pos = makeMove({ x: pos.x, y: pos.y }, {
        x: pos.x,
        y: pos.y + 1,
      });
      break;
    case "<":
      pos = makeMove({ x: pos.x, y: pos.y }, {
        x: pos.x - 1,
        y: pos.y,
      });
      break;
    case ">":
      pos = makeMove({ x: pos.x, y: pos.y }, {
        x: pos.x + 1,
        y: pos.y,
      });
      break;
    default:
      pos = undefined;
  }
}
const count = map.reduce((acc, row) => {
  return acc + row.reduce((acc, cell) => {
    return cell === "X" ? acc + 1 : acc;
  }, 0);
}, 0);

console.log("Part 1 Answer: ", count);
