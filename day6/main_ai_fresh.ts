type Position = { x: number; y: number };
type Direction = "up" | "right" | "down" | "left";

const directions: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

const turnRight: Record<Direction, Direction> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

function findGuard(map: string[]): { pos: Position; dir: Direction } {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "^") return { pos: { x, y }, dir: "up" };
    }
  }
  throw new Error("Guard not found");
}

function isInBounds(pos: Position, map: string[]): boolean {
  return pos.y >= 0 && pos.y < map.length && pos.x >= 0 &&
    pos.x < map[0].length;
}

function countGuardPositions(input: string): number {
  const map = input.split("\n").filter((line) => line.length > 0);
  const visited = new Set<string>();
  let { pos, dir } = findGuard(map);

  while (true) {
    visited.add(`${pos.x},${pos.y}`);

    const nextPos = {
      x: pos.x + directions[dir].x,
      y: pos.y + directions[dir].y,
    };

    // Check if next position is out of bounds
    if (!isInBounds(nextPos, map)) {
      break;
    }

    // If we hit an obstacle, turn right
    if (map[nextPos.y][nextPos.x] === "#") {
      dir = turnRight[dir];
      continue;
    }

    pos = nextPos;
  }

  return visited.size;
}

export function part1(input: string): number {
  return countGuardPositions(input);
}
