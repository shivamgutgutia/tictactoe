var board = new Array(9).fill("")
const human = 'O'
const computer = 'X'

const cells = document.querySelectorAll(".cell")

function turn(squareId,player){
    board[squareId]=player
    document.getElementById(squareId).innerText=player
}

function clickField(square){
    turn(square.target.id,human)
    
    let win = checkWin(board,player)
    if(win) gameOver(win)
}

function checkWin(board,player){
    
}

function startGame(){
    document.querySelector(".endgame").style.display="none"
    board = new Array(9).fill("")
    for (let i=0;i<cells.length;i++){
        cells[i].innerText = ""
        cells[i].style.removeProperty("background-color")
        cells[i].addEventListener("click",clickField,false)
    }
}





startGame()