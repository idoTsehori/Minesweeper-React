const Cell = ({ cell, i, j, handleCellClick }) => {
  const { isShown, minesAroundCount, isMine } = cell

  const showCell = () => {
    if (isMine) return '💣'
    if (minesAroundCount) return minesAroundCount
  }

  return (
    <td className={`cell ${isShown ? 'clicked' : ''}`} onClick={() => handleCellClick(i, j)}>
      {isShown && showCell()}
    </td>
  )
}
export default Cell
