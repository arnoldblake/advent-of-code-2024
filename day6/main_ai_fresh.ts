import { readFile } from "../lib/readFile.ts";

// Directions: up, right, down, left
const directions = [
  { dx: -1, dy: 0 }, // up
  { dx: 0, dy: 1 }, // right
  { dx: 1, dy: 0 }, // down
  { dx: 0, dy: -1 }, // left
];

async function main() {
  const input = (await readFile("input")).split("\n").map((line) =>
    line.split("")
  );

  // Find the initial position and direction of the guard
  let guardX = -1, guardY = -1, directionIndex = -1;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "^") {
        guardX = i;
        guardY = j;
        directionIndex = 0; // up
      }
    }
  }

  // Set to keep track of visited positions
  const visited = new Set();
  visited.add(`${guardX},${guardY}`);

  // Function to check if a position is within the map bounds
  const isInBounds = (x: number, y: number) =>
    x >= 0 && x < input.length && y >= 0 && y < input[0].length;

  // Simulate the guard's movement
  while (true) {
    const { dx, dy } = directions[directionIndex];
    const nextX = guardX + dx;
    const nextY = guardY + dy;

    if (!isInBounds(nextX, nextY)) {
      break; // Stop if the guard reaches the end of the map
    }

    if (input[nextX][nextY] !== "#") {
      // Move forward
      guardX = nextX;
      guardY = nextY;
      visited.add(`${guardX},${guardY}`);
    } else {
      // Turn right
      directionIndex = (directionIndex + 1) % 4;
    }
  }

  // Output the number of distinct positions visited
  console.log(visited.size - 1); // Adjust the count by subtracting 1
}

main();
