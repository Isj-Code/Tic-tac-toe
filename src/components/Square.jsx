// Return con dibujado de cada celda
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handeClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handeClick} className={className}>
            {children}
        </div>
    )
}