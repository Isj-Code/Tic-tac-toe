import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App () {
  // ? Manejo de Estados
  // Actualizar el estado del tablero - Array
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })

  // Actualizar el turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // Seleccionar ganador
  const [winner, setWinner] = useState(null) // null no hay ganador, false hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // No actualizar el square si hay algo, retornamos si encuentr algo en la posición
    if (board[index] || winner) return
    // Creamos un nuevo Board y le pasamos el turno actual en la posicion del index recibido
    const newBoard = [...board]
    newBoard[index] = turn
    // Actualizamos el estado con el nuevo board o volveremos al estado inicial
    // con todo vacio + la nueva entrada en el Array
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // ? Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Revisar Ganador, le pasamos el board que tenemos en el estado actual
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame} type='reset'>Reset del Juego</button>
      <section className='game'>
        {
          // se dibuja el tablero
          board.map((square, index) => {
            /**
             * se pone como key el index ya que solo usamos 9 celdas
             * se pasa el index para saber que celda pulsamos
             * se pasa la funcion updateBoard para llamarla cuando pulsamos
             */
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      {/* Comprobacion de que turno está seleccionado, para ponerle el fondo azul */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </section>
    </main>
  )
}

export default App
