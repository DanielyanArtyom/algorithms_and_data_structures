const possibleNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const printBoard = (board) => {
  let str = "";
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      str += `${board[row][col]}, `;
      if (col === board.length - 1) {
        console.log(`${str}`);
        str = "";
      }
    }
  }
};

const helper = (emptySpaceIdx, emptySpaces, board) => {
  if (emptySpaceIdx >= emptySpaces.length) {
    return true;
  }

  const { row, col } = emptySpaces[emptySpaceIdx];

  for (let i = 0; i < possibleNumber.length; ++i) {
    if (isValid(possibleNumber[i], col, row, board)) {
      board[row][col] = possibleNumber[i];

      if (helper(emptySpaceIdx + 1, emptySpaces, board)) {
        return true;
      }
      board[row][col] = ".";
    }
  }

  return false;
};

const isValid = (number, col, row, board) => {
  for (let i = 0; i < board.length; ++i) {
    if (board[row][i] === number || board[i][col] === number) {
      return false;
    }
  }

  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; ++i) {
    for (let j = startCol; j < startCol + 3; ++j) {
      if (board[i][j] === number) {
        return false;
      }
    }
  }

  return true;
};

const solveSudoku = (board) => {
  let emptySpaces = [];

  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board.length; ++j) {
      if (board[i][j] === ".") {
        emptySpaces.push({
          row: i,
          col: j,
        });
      }
    }
  }

  helper(0, emptySpaces, board);
  printBoard(board);
};

solveSudoku([
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
]);
