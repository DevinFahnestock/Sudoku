import Square from "./Square";

const Board = ({ updateTile, board, onClick }) => {
  return (
    <div className="Board">
      {board.map((row, indexX) => (
        row.map((item, indexY) => (
          <Square
            key={((indexX*9)+indexY)}
            updateTile={(value) => updateTile(item.x, item.y, value, board)}
            value={item.value}
            isValid={item.valid}
          />
        ))
      ))}
    </div>
  );
};

export default Board;