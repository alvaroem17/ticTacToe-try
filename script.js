// Creamos el tablero vacio 
let board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
]

const resButton = document.getElementsByTagName('button')[0]
const cells = [...document.getElementsByTagName('td')]

console.log(cells)

let player = 'X'
let moveNumber = 1
let isOver = false

const isSelected = (row, col) => {
    return board[row][col] !== '-' ? true : false
}

const changePlayer = () => {
    player = (player === 'X' ? 'O' : 'X')
}

const selectCell = (e) => {
    let target = e.target
    let row = target.className.slice(-1) -1
    let col = target.parentNode.className.slice(-1) -1
    if(!isSelected(row, col)){
        board[row][col] = player
        e.target.innerHTML = player
        e.target.classList.add('selected')
        changePlayer()
        moveNumber++
    }
    console.log(col, row)
}



cells.forEach(button =>{
    button.addEventListener('click',selectCell)
})

//resButton.addEventListener('click',resetGame)