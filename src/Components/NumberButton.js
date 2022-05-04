const NumberButton = ({ onClick, value }) => {
  return (
    <>
        <button onClick={() => onClick(value)}>{value}</button>
    </>
  )
}

export default NumberButton