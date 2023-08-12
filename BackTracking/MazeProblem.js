const maze1 = [
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1],
];

let isValid = (i, j, n, m, maze) => i < n && j < m && maze[i][j] === 1;

const generateMaze = (n, m) => {
  let solution = Array(n);

  for (let i = 0; i < n; ++i) {
    solution[i] = Array(m).fill(0);
  }

  return solution;
};

let backtrack = (i, j, n, m, maze, solution) => {
  if (i === n - 1 && j === m - 1 && maze[i][j] === 1) {
    solution[i][j] = 1;
    return true;
  }

  if (isValid(i, j, m, n, maze)) {
    if (solution[i][j] === 1) {
      return false;
    }

    solution[i][j] = 1;

    if (
      backtrack(i + 1, j, m, n, maze, solution) ||
      backtrack(i, j + 1, m, n, maze, solution) ||
      backtrack(i - 1, j, m, n, maze, solution) ||
      backtrack(i, j - 1, m, n, maze, solution)
    ) {
      return true;
    }

    solution[i][j] = 0;
    return false;
  }

  return false;
};

let printMaze = (maze, n, m) => {
  let str = "";
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      str += `${maze[row][col]}, `;
      if (col === m - 1) {
        console.log(`${str}`);
        str = "";
      }
    }
  }
};

let solveMaze = (maze, n, m) => {
  const solution = generateMaze(n, m);
  backtrack(0, 0, n, m, maze, solution);
  printMaze(solution, n, m);
};

solveMaze(maze1, 4, 4);
