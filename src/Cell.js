const Cell = ({ cell, i, j, handleCellClick }) => {
  const { isShown, minesAroundCount } = cell

  return <td onClick={() => handleCellClick(i, j)}>{isShown ? minesAroundCount : ''}</td>
}
export default Cell
