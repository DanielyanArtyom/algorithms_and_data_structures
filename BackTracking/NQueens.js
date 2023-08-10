const isValid = (row, col, columns, positiveDiag, negativeDiag) =>
  !(
    columns.has(col) ||
    positiveDiag.has(row + col) ||
    negativeDiag.has(row - col)
  );

const addQueen = (row, col, board, columns, positiveDiag, negativeDiag) => {
  columns.add(col);
  positiveDiag.add(row + col);
  negativeDiag.add(row - col);

  board[row][col] = "Q";
};

const removeQueen = (row, col, board, columns, positiveDiag, negativeDiag) => {
  columns.delete(col);
  positiveDiag.delete(row + col);
  negativeDiag.delete(row - col);

  board[row][col] = "_";
};

const helper = (row, col, board, columns, positiveDiag, negativeDiag) => {
  if (row === col) {
    return true;
  }

  for (let _col = 0; _col < col; ++_col) {
    if (isValid(row, _col, columns, positiveDiag, negativeDiag)) {
      addQueen(row, _col, board, columns, positiveDiag, negativeDiag);

      if (helper(row + 1, col, board, columns, positiveDiag, negativeDiag)) {
        return true;
      }

      removeQueen(row, _col, board, columns, positiveDiag, negativeDiag);
    }
  }

  return false;
};

const printBoard = (BoardLength, board) => {
  let str = "";
  for (let row = 0; row < BoardLength; row++) {
    for (let col = 0; col < BoardLength; col++) {
      str += `${board[row][col]}, `;
      if (col === BoardLength - 1) {
        console.log(`${str}`);
        str = "";
      }
    }
  }
};

const nQueens = (n) => {
  let board = Array.from(Array(n), () => new Array(n).fill("_"));

  let columns = new Set();
  let positiveDiag = new Set();
  let negativeDiag = new Set();

  helper(0, n, board, columns, positiveDiag, negativeDiag);
  printBoard(n, board);
};

nQueens(4);
