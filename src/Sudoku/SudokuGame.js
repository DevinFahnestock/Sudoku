import {
  invalidateSquare,
  invalidateRow,
  invalidateColumn,
} from "./Validation";

export const isRowValid = (boardToCheck, y, value) => {
  let count = 0;
  for (let x = 0; x < 9; x++) {
    if (boardToCheck[x][y].value === value) {
      count++;
    }
  }
  return count <= 1;
};

export const isColumnValid = (boardToCheck, x, value) => {
  let count = 0;
  for (let y = 0; y < 9; y++) {
    if (boardToCheck[x][y].value === value) {
      count++;
    }
  }

  return count <= 1;
};

export const isSquareValid = (boardToCheck, gridX, gridY, value) => {
  let count = 0;

  for (let checkX = 0; checkX < 3; checkX++) {
    for (let checkY = 0; checkY < 3; checkY++) {
      if (
        boardToCheck[gridX * 3 + checkX][gridY * 3 + checkY].value === value
      ) {
        count++;
      }
    }
  }

  return count <= 1;
};

const setInvalidation = (value, x, y, board, setInvalidFlag) => {
  if (value > 0) {
    let gridX = Math.floor(x / 3);
    let gridY = Math.floor(y / 3);
    if (!isSquareValid(board, gridX, gridY, value))
      invalidateSquare(gridX, gridY, value, board, setInvalidFlag);
    if (!isColumnValid(board, x, value))
      invalidateColumn(x, value, board, setInvalidFlag);
    if (!isRowValid(board, y, value))
      invalidateRow(y, value, board, setInvalidFlag);
  }
};

export const updateBoardTile = (tilex, tiley, value, board, setWon) => {
  let copy = [...board];
  copy[tilex][tiley].value = value;

  const setInvalidFlag = (x, y, validity) =>
    (copy[x][y].toBeInvalid = validity);

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      setInvalidation(copy[x][y].value, x, y, copy, setInvalidFlag);
    }
  }

  let correctCount = 0;

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      copy[x][y].valid = true;
      if (copy[x][y].toBeInvalid) {
        copy[x][y].valid = false;
        setInvalidFlag(x, y, false);
      }
      if (copy[x][y].valid === true && copy[x][y].value > 0) correctCount++;
    }
  }

  if (correctCount > 80) setWon(true);
  return copy;
};
