import { WINNER_COMBOS } from "../constants"

// Usamos el siguiente useState para pintar el tablero de forma que
// cada vez que alguien pincha en un cuadrado se redibuje

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    // Si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    // chequeamos que todas las casillas sean distintas de null.
    return newBoard.every((square) => square !== null) // true en caso de no encontrar un null
}