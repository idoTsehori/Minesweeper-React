const Cell = ({ cell, i, j, handleCellClick, handleRightClick }) => {
  const { isShown, minesAroundCount, isMine, isMarked } = cell

  const showCell = () => {
    if (isMarked) return '⛳'
    if (!isShown) return
    if (isMine) return '💣'
    if (minesAroundCount) return minesAroundCount
  }

  return (
    <td
      className={`cell ${isShown ? 'clicked' : ''}`}
      onClick={() => handleCellClick(i, j)}
      onContextMenu={(ev) => handleRightClick(ev, i, j)}>
      {showCell()}
    </td>
  )
}
export default Cell
