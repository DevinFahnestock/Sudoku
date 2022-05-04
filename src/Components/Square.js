const Square = ({ isValid, updateTile, value, won }) => {
  
  return (
    <div className="Square">
      <input
        data-valid={isValid}
        data-won={won}
        maxLength="1"
        type="text"
        onClick={(e) => e.target.select()}
        onChange={(e) => {
          let input = e.target.value;
          if (input < 10 && input > 0) {
            updateTile(input);
          }
        }}
        
        value={(value === 0) ? " " : value}
      />
    </div>
  );
};

export default Square;
