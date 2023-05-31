import { useEffect, useState } from 'react'
import Cell from './Cell'

import { nanoid } from 'nanoid'

const Board = () => {
  const [boardSize, setBoardSize] = useState(8)
  const [gameDetails, setGameDetails] = useState({
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3,
    totalMinesCount: 2,
  })
  const [board, setBoard] = useState(null)

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

  const expandShown = (updatedBoard, cellI, cellJ) => {
    for (let i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= updatedBoard.length) continue
      for (let j = cellJ - 1; j <= cellJ + 1; j++) {
        if (j < 0 || j >= updatedBoard[0].length) continue
        let currCell = updatedBoard[i][j]

        if (!currCell.isShown && !currCell.minesAroundCount) {
          handleCellClick(i, j)
          expandShown(updatedBoard, i, j)
        } else if (!currCell.isShown) {
          handleCellClick(i, j)
        }
      }
    }
  }

  const handleCellClick = (i, j) => {
    const cell = board[i][j]
    if (cell.isShown || cell.isMarked) return
    if (!gameDetails.isOn) handleFirstCellClick(i, j)

    const updatedBoard = [...board]
    updatedBoard[i][j] = {
      ...updatedBoard[i][j],
      isShown: true,
    }
    setBoard(updatedBoard)

    if (cell.isMine) return // onMineCellClick(elCell, i, j)
    if (cell.isMarked) return // onMineCellClick(elCell, i, j)
    else if (cell.minesAroundCount === 0) expandShown(updatedBoard, i, j)
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

  const handleRightClick = (ev, i, j) => {
    ev.preventDefault()
    const clickedCell = board[i][j]
    if (clickedCell.isMine && clickedCell.isShown) return
    const updatedBoard = [...board]
    updatedBoard[i][j] = {
      ...updatedBoard[i][j],
      isMarked: !updatedBoard[i][j].isMarked,
    }
    setBoard(updatedBoard)
    // clickedCell.isMarked = !clickedCell.isMarked
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
                    handleRightClick={handleRightClick}
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
