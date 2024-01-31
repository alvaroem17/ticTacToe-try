// Creamos el tablero vacio 
let board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
]

const resButton = document.getElementsByTagName('button')[0]
const cells = [...document.getElementsByTagName('td')]
const gameStatus = document.querySelector('h3')

let player = 'X'
let moveNumber = 0
let isOver = false

const isSelected = (row, col) => {
    return board[row][col] !== '-' ? true : false
}

const changePlayer = () => {
    player = (player === 'X' ? 'O' : 'X')
    if(moveNumber < 9 && !checkWin()) {
        gameStatus.innerHTML = 'Player ' + player + "'s turn"
    }
}

const checkWin = () => {
    if(board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] !== '-') {
        return true
    }else if(board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== '-') {
        return true
    }else if(board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== '-') {
        return true
    }else if(board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== '-') {
        return true
    }else if(board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] !== '-') {
        return true
    }else if(board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== '-') {
        return true
    }else if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '-') {
        return true
    }else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '-') {
        return true
    }
}

const playerWin = () => {
    if(isOver){
        gameStatus.innerHTML = 'Game Over! Its a tie!'
        cells.forEach(cell => {
            cell.classList.remove('selected')
            cell.classList.add('loose')
        })
    }else{
        gameStatus.innerHTML = 'Player ' + player + ' wins!'
        cells.forEach(cell => {
            cell.classList.remove('selected')
            cell.classList.add('win')
        })
    }
}

const resetGame = () => {
    board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ]
    cells.forEach(cell => {
        moveNumber = 0
        isOver = false
        player = 'X'
        gameStatus.innerHTML = 'Player ' + player + "'s turn"
        cell.innerHTML = ''
        cell.classList.remove('selected')
        cell.classList.remove('win')
        cell.classList.remove('loose')
    })
}

const selectCell = (e) => {
    let target = e.target
    let row = target.className.slice(-1) -1
    let col = target.parentNode.className.slice(-1) -1

    if(!isSelected(row, col)) {
        board[row][col] = player
        e.target.innerHTML = player
        e.target.classList.add('selected')
        moveNumber++
    }
    if(checkWin()) {
        playerWin()
    }
    if(moveNumber > 9) {
        isOver = true
        playerWin()
    }
    console.log(player)
    changePlayer()
    console.log(player)
}



cells.forEach(button =>{
    button.addEventListener('click',selectCell)
})

resButton.addEventListener('click',resetGame)