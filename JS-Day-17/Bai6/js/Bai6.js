function drawChessboard() {
  let chessboard = "";

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      if ((row + col) % 2 === 0) {
        chessboard += "██"; // Ký tự đại diện cho ô đen
      } else {
        chessboard += "  "; // Ký tự đại diện cho ô trắng
      }
    }
    chessboard += "\n";
  }

  return chessboard;
}

const board = drawChessboard();
console.log(board);
