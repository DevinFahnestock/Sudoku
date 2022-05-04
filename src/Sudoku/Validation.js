export const invalidateSquare = (
  gridX,
  gridY,
  value,
  board,
  setInvalidFlag
) => {
  for (let checkX = 0; checkX < 3; checkX++) {
    for (let checkY = 0; checkY < 3; checkY++) {
      if (board[gridX * 3 + checkX][gridY * 3 + checkY].value === value) {
        setInvalidFlag(gridX * 3 + checkX, gridY * 3 + checkY, true);
        console.log(gridY)
      }
    }
  }
};

export const invalidateRow = (y, value, board, setInvalidFlag) => {
  for (let x = 0; x < 9; x++) {
    if (board[x][y].value === value) {
      setInvalidFlag(x, y, true);
    }
  }
};

export const invalidateColumn = (x, value, board, setInvalidFlag) => {
  for (let y = 0; y < 9; y++) {
    if (board[x][y].value === value) {
      setInvalidFlag(x, y, true);
    }
  }
};
