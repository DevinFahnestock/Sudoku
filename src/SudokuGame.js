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

export const updateBoardTile = (tilex, tiley, value, board) => {
  let copy = [...board];
  copy[tilex][tiley].value = value;

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      let gridX = Math.floor(x / 3);
      let gridY = Math.floor(y / 3);

      let value = copy[x][y].value;
      if (value > 0) {
        if (!isSquareValid(copy, gridX, gridY, value)) {
          for (let checkX = 0; checkX < 3; checkX++) {
            for (let checkY = 0; checkY < 3; checkY++) {
              if (
                copy[gridX * 3 + checkX][gridY * 3 + checkY].value === value
              ) {
                copy[gridX * 3 + checkX][gridY * 3 + checkY].toBeInvalid = true;
              }
            }
          }
        }
        if (!isRowValid(copy, y, value)) {
          for (let x = 0; x < 9; x++) {
            if (copy[x][y].value === value) {
              copy[x][y].toBeInvalid = true;
            }
          }
        }
        if (!isColumnValid(copy, x, value)) {
          for (let y = 0; y < 9; y++) {
            if (copy[x][y].value === value) {
              copy[x][y].toBeInvalid = true;
            }
          }
        }
      }
    }
  }

  let correctCount = 0

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      copy[x][y].valid = true;
      if (copy[x][y].toBeInvalid) {
        copy[x][y].valid = false;
        copy[x][y].toBeInvalid = false;
      } 
      if (copy[x][y].valid === true && copy[x][y].value > 0) correctCount++
    }
  }
  return copy;
};
