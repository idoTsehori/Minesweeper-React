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
    totalMinesCount: 2,
  })

  const [board, setBoard] = useState(null)
  const [boardSize, setBoardSize] = useState(3)

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
    if (!gameDetails.isOn) handleFirstCellClick(i, j)

    const updatedBoard = [...board]
    updatedBoard[i][j] = {
      ...updatedBoard[i][j],
      isShown: true,
    }
    setBoard(updatedBoard)
  }

  const handleFirstCellClick = (i, j) => {
    setGameDetails((prevState) => ({
      ...prevState,
      isOn: true,
    }))

    const putMinesinRandomPos = (cellI, cellJ) => {
      const updatedBoard = [...board]

      let minesCount = 0

      while (minesCount < gameDetails.totalMinesCount) {
        let randomI = Math.floor(Math.random() * boardSize)
        let randomJ = Math.floor(Math.random() * boardSize)

        if (updatedBoard[randomI][randomJ].isMine) continue
        if (randomI === cellI && randomJ === cellJ) continue

        updatedBoard[randomI][randomJ] = {
          ...updatedBoard[randomI][randomJ],
          isMine: true,
        }

        minesCount++
      }
      setBoard(updatedBoard)
    }
    const countMinesAround = (cellI, cellJ) => {
      let count = 0
      const updatedBoard = [...board]
      for (let i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
          if (i === cellI && j === cellJ) continue
          if (j < 0 || j >= board.length) continue
          let currCell = board[i][j]
          if (currCell.isMine) count++
        }
      }
      updatedBoard[cellI][cellJ] = {
        ...updatedBoard[cellI][cellJ],
        minesAroundCount: count,
      }
      setBoard(updatedBoard)
    }

    putMinesinRandomPos(i, j)

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        countMinesAround(i, j)
      }
    }
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
