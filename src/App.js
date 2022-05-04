import "./App.css";

import { useEffect, useState } from "react";

import Header from "./Components/Header";
import Board from "./Components/Board";
import { updateBoardTile } from "./Sudoku/SudokuGame";

function App() {
  const [won, setWon] = useState(false);

  const fetchBoard = true;

  const [board, setBoard] = useState(() => {
    let board = [];
    for (let x = 0; x < 9; x++) {
      board[x] = [];
      for (let y = 0; y < 9; y++)
        board[x][y] = {
          key: x * 9 + y,
          value: 0,
          x: x,
          y: y,
          valid: true,
          toBeInvalid: false,
          readonly: false,
        };
    }
    return board;
  });

  useEffect(() => {
    const fetchData = async () => {
      const datastream = await fetch(
        "https://raw.githubusercontent.com/DevinFahnestock/Sudoku/master/src/board1.json"
      );
      const dataJSON = await datastream.json();
      setBoard(dataJSON);
    };

    fetchBoard && fetchData();
  }, [setBoard]);

  const updateBoard = (x, y, value, board) => {
    setBoard(updateBoardTile(x, y, value, board, setWon));
  };

  return (
    <div className="container">
      <Header title="Sudoku" />
      <Board updateTile={updateBoard} board={board} won={won} />
      {/* <button
        onClick={() => {
          let copy = [...board]
          for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
              if (copy[x][y].value > 0) {
                copy[x][y].readonly = true
              }
            }
          }
          console.log(JSON.stringify(copy));
        }}
      >Output Board</button> */}
    </div>
  );
}

export default App;
