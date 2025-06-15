var statusWord = document.querySelector('.status')
var resetBtn = document.querySelector('.reset')
var cells = document.querySelectorAll('.cells')

let playing = true
let board = Array(9).fill(null)
let currentPlayer = 'X'

const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

function clickHandle(e){
    const index = e.target.dataset.index

    if(board[index] || !playing) return

    board[index] = currentPlayer ;
    e.target.textContent = currentPlayer;
    if(winner()){
        statusWord.textContent = `Player ${currentPlayer} Wins`
        playing = false;
    }
    else if(board.every(cell => cell)){
        statusWord.textContent = "Match Draw"
        playing = false;
    }
    else{
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        statusWord.textContent = `Player ${currentPlayer}'s Turn`
    }
}

function winner(){
    return winningPatterns.some(pattern => {
        const [a,b,c] = pattern
        return board[a] && board[a] === board[b] && board[b] === board[c]
    })
}

resetBtn.addEventListener('click' ,() => {
    board.fill(null)
    cells.forEach(cell => cell.textContent = '')
    playing = true;
    currentPlayer = 'X'
    statusWord.textContent = "Player X's Turn"

})

cells.forEach(cell => cell.addEventListener('click', clickHandle))