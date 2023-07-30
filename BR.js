// function findSolution(n, ...args) {
//   if ("found a solution") {
//     ("++numSol");
//     ("displaySol()");
//     return;
//   }

//   for (let i = 0; i < n - 1; ++i) {
//     ("applyValue(val,n)");
//     ("findSolution( n + 1)");
//     ("removeValue()");
//   }
// }

// function ifFoundSolution(n) {
//   if ("found a solution") {
//     return true;
//   }

//   for (let i = 0; i < n; ++i) {
//     if ("isValid(i)") {
//       ("apply()");
//       if (ifFoundSolution(i)) {
//         return true;
//       }

//       ("remove()");
//     }
//   }

//   return false;
// }

function towersOfHanos(n, a, b, c) {
  // O(2 ^n - 1)
  if (n === 0) {
    return null;
  }
  towersOfHanos(n - 1, a, c, b);
  console.log(`${a} -> ${c}`);
  towersOfHanos(n - 1, b, a, c);
}
// towersOfHanos(3, "A", "B", "C");

function knightsTourProblem(step) {
  let arrI = [-2, -2, -1, -1, 1, 1, 2, 2];
  let arrJ = [-1, 1, -2, 2, -2, 2, -1, 1];

  if (step === board.length * board.length - 1) {
    return true;
  }

  //   let board = []

  //   for(k ... arrI.length) {
  // let newI = i + arrI[k]
  // let newJ = j + arrJ[k]
  // }
  // if(isValidMove(newI,newJ, board)){
  //  board[newI][newJ] = step
  // if(knightsTourProblem( newI, newJ, step + 1)) {
  //    return true
  //   } else {
  // board[newI][newJ] = -1
  // }
  //   }
//    fors stexa prcnum
  //   return false
}

let isValidMove = (i, j, board) =>
  i >= 0 &&
  j >= 0 &&
  i < board.length &&
  j < board[0].length &&
  board[i][j] === -1;
