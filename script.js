// Creamos el tablero vacio 
let board = [//tablero vacio
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
]

const resButton = document.getElementsByTagName('button')[0]//traemos el boton de reseteo
const cells = [...document.getElementsByTagName('td')]//traemos los td y lo convertimos en array con spread operator
const gameStatus = document.querySelector('h3')//traemos el mensaje de estado

let player = 'X'
let moveNumber = 0 //numero de movimientos
let isOver = false //es in empate

function selectCell(e) {//comprobamos si la celda esta marcada, si no lo está la marcamos
    let target = e.target
    let row = target.className.slice(-1) -1
    let col = target.parentNode.className.slice(-1) -1

    if(!isSelected(row, col)) {//comprobamos que no este seleccionada
        updateCanva(e,row, col)
        if(checkWin()) {//si gana llamamos a playerWin
            playerWin()
        }
        if(!checkWin() && moveNumber > 8) {//en caso de que nadie haya ganado y el tablero 
            isOver = true//este lleno decimos que es un empate y llamamos a playerwin
            playerWin()
        }
        changePlayer()//cambiamos de jugador
    }
}

function updateCanva(e,row, col) {//actualizamos el tablero y el array que lo representa
    board[row][col] = player
    e.target.innerHTML = player
    e.target.classList.add('selected')
    moveNumber++//aumentamos el numero de movimientos para saber si ya se hicieron todos
}

function isSelected(row, col){//comprobamos que la celda esta vacia
    return board[row][col] !== '-' ? true : false
}

function changePlayer(){//cambiamos de jugador a menos que se haya acabado la partida
    player = (player === 'X' ? 'O' : 'X')
    if(moveNumber < 9 && !checkWin()) {
        gameStatus.innerHTML = 'Player ' + player + "'s turn"
    }
}

function checkWin(){//comprobamos que se haya ganado
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
    }else {
        return false
    }
}

function playerWin(){
    if(isOver){//si hay empate ponemos todo en rojo
        gameStatus.innerHTML = 'Game Over! Its a tie!'
        cells.forEach(cell => {
            cell.classList.remove('selected')
            cell.classList.add('loose')
        })
    }else{//si un jugador gana se pone en verde y aparece quien gano
        gameStatus.innerHTML = 'Player ' + player + ' wins!'
        cells.forEach(cell => {
            cell.classList.remove('selected')
            cell.classList.add('win')
        })
    }
}

function resetGame(){//reiniciamos la partida
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




cells.forEach(button =>{//escuchamos donde se ha clicado para marcarlo
    button.addEventListener('click',selectCell)
})

resButton.addEventListener('click',resetGame)//boton de reinicio