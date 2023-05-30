import { useEffect, useState } from 'react'
import Cell from './Cell'

import { nanoid } from 'nanoid'

const Board = () => {
  const [gameDetails, setGameDetails] = useState({
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3,
  })

  const [board, setBoard] = useState(null)
  const [boardSize, setBoardSize] = useState(5)

  console.log(board)
  useEffect(() => {
    builtBoard()
  }, [boardSize])

  const builtBoard = () => {
    const board = []
    for (let i = 0; i < boardSize; i++) {
      board[i] = []
      for (var j = 0; j < boardSize; j++) {
        board[i][j] = {
          minesAroundCount: 0,
          isShown: false,
          isMine: false,
          isMarked: false,
        }
      }
    }
    setBoard(board)
  }

  const handleCellClick = (i, j) => {
    if (board[i][j].isShown) return
    if (!gameDetails.isOn) handleFirstCellClick()

    const updatedBoard = [...board]
    updatedBoard[i][j] = {
      ...updatedBoard[i][j],
      isShown: true,
    }
    setBoard(updatedBoard)
  }

  const handleFirstCellClick = () => {
    console.log('first click')
    setGameDetails((prevState) => ({
      ...prevState,
      isOn: true,
    }))
  }

  if (!board) return <h1>Loading...</h1>

  return (
    <table className="board">
      <tbody>
        {board.map((row, iIdx) => {
          return (
            <tr key={nanoid()}>
              {row.map((cell, jIdx) => {
                return (
                  <Cell
                    i={iIdx}
                    j={jIdx}
                    handleCellClick={handleCellClick}
                    key={nanoid()}
                    cell={cell}
                  />
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default Board
