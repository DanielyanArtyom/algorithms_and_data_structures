const BoardLength = 8;

const isValidMove = (i, j, board) =>
  i >= 0 && j >= 0 && i < BoardLength && j < BoardLength && board[i][j] === -1;

const generateBoard = () => {
  let newBoard = new Array(BoardLength);
  for (let i = 0; i < BoardLength; ++i) {
    newBoard[i] = new Array(2);
  }

  for (let i = 0; i < BoardLength; ++i) {
    for (let j = 0; j < BoardLength; ++j) {
      newBoard[i][j] = -1;
    }
  }

  return newBoard;
};

const printBoard = (board) => {
  let str = "";
  for (let x = 0; x < BoardLength; x++) {
    for (let y = 0; y < BoardLength; y++) {
      str += `${board[x][y]}, `;
      if (y === 7) {
        console.log(`${str}`);
        str = "";
      }
    }
  }
};

function knightsTourProblem(startX, startY) {
  let board = generateBoard();

  board[startX][startY] = 0;

  if (!helper(0, 0, 1, board)) {
    console.log("solution does not exist");
    return false;
  } else {
    printBoard(board);
  }

  return true;
}

function helper(i, j, step, board) {
  let arrI = [-2, -2, -1, -1, 1, 1, 2, 2];
  let arrJ = [-1, 1, -2, 2, -2, 2, -1, 1];

  if (step === BoardLength * BoardLength) {
    return true;
  }

  for (let k = 0; k < BoardLength; ++k) {
    let newI = i + arrI[k];
    let newJ = j + arrJ[k];

    if (isValidMove(newI, newJ, board)) {
      board[newI][newJ] = step;
      if (helper(newI, newJ, step + 1, board)) {
        return true;
      } else {
        board[newI][newJ] = -1;
      }
    }
  }
}

knightsTourProblem(0, 0);
