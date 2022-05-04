import "./App.css";

import { useState } from "react";

import Header from "./Components/Header";
import Board from "./Components/Board";
import { updateBoardTile } from "./SudokuGame"

function App() {
  const [board, setBoard] = useState(() => {
    let board = [];
    for (let x = 0; x < 9; x++) {
      board[x] = [];
      for (let y = 0; y < 9; y++)
        board[x][y] = {
          key: x*9+y,
          value: 0,
          x: x,
          y: y,
          valid: true,
          toBeInvalid: false
        };
    }
    return board;
  });
  
  const updateBoard = (x, y, value, board) => {
    setBoard(updateBoardTile(x, y, value, board))
  }

  return (
    <div className="container">
      <Header title="Sudoku Solver" />
      <Board updateTile={updateBoard} board={board} />
    </div>
  );
}

export default App;
