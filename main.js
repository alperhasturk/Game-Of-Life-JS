let board = Array(20)
  .fill()
  .map(() => Array(20).fill(0));

board = board.map((row) => row.map((cell) => Math.round(Math.random())));

function State(board) {
  const nextBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let liveNeighbors = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue;
          if (board[i + x] && board[i + x][j + y]) liveNeighbors++;
        }
      }
      if (board[i][j] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) nextBoard[i][j] = 0;
      if (board[i][j] === 0 && liveNeighbors === 3) nextBoard[i][j] = 1;
    }
  }
  return nextBoard;
}

function render(board) {
  console.clear();
  console.log(board.map((row) => row.map((cell) => (cell ? "X" : " ")).join(" ")).join("\n"));
}

setInterval(() => {
  board = State(board);
  render(board);
}, 500);
