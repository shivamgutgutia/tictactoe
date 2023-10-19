var board
const human = 'O'
const ai = 'X'
const winConfigs = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

cells = document.querySelectorAll(".cell")


function restart(){
    document.querySelector(".endgame").style.display="none"
    board = new Array(9).fill("")
    for (let i=0;i<cells.length;i++){
        cells[i].innerText = ""
        cells[i].style.removeProperty("background-color")
        cells[i].addEventListener("click",playMove,false)
    }
}
restart()

function displayMessage(who){
    let endBox = document.querySelector(".endgame")
    let endBoxText = document.querySelector(".endgame .text")
    endBox.style.display = "block"
    endBoxText.innerText=who
    cells.forEach((cell)=>{
        cell.removeEventListener("click",playMove,false)
    })
}

function endGame(board){
    
    if(winStatus(board,human)){
        displayMessage(human+" Wins")
        return true
    }
    if(winStatus(board,ai)){
        displayMessage(ai+" Wins")
        return true
    }
    if(tieStatus(board)){
        displayMessage("Tie Game")
        return true
    }
    return false
}


function playMove(square){
    const squareId = square.target.id 
    cells[squareId].innerText = human
    board[squareId]=human
    cells[squareId].removeEventListener("click",playMove,false)
    if(endGame(board)) return
    const aiSquareId = minimax(board,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,true).move
    board[aiSquareId]=ai
    cells[aiSquareId].removeEventListener("click",playMove,false)
    cells[aiSquareId].innerText = ai
    if(endGame(board)) return
}

function winStatus(board,player){
    for(let config of winConfigs){
        if(config.every(index=>board[index]===player)) return true
    }
    return false
}

function evalScore(board){
    var score
    if(winStatus(board,human)){
        score =-1
    }else if(winStatus(board,ai)){
        score=1
    }else{
        score=0
    }
    const multiplier = (board.filter(cell=>cell==="").length)+1
    return (score*multiplier)
    
}

function tieStatus(board){
    if(board.filter(cell=>cell==="").length) return false
    return true
}

function minimax(board,alpha,beta,isMaximising){
    if(tieStatus(board) || winStatus(board,human) || winStatus(board,ai)){
        return {score:evalScore(board)}
    }

    let indexes=[]
    board.forEach((element,index)=>{
        if(element=="") indexes.push(index)
    })

    let bestMove=-1

    if(isMaximising){
        let maxEval = Number.NEGATIVE_INFINITY

        for(let index of indexes){
            board[index]= ai
            let eval = minimax(board,alpha,beta,!isMaximising).score
            board[index]=""
            if (eval>maxEval){
                maxEval=eval
                bestMove = index
            }
            alpha = Math.max(alpha,eval)
            if(beta<=alpha) break
        }
        return {score:maxEval,move:bestMove}
    }else{
        let minEval = Number.POSITIVE_INFINITY

        for(let index of indexes){
            board[index]= human
            let eval = minimax(board,alpha,beta,!isMaximising).score
            board[index]=""
            if (eval<minEval){
                minEval=eval
                bestMove = index
            }
            beta = Math.min(beta,eval)
            if(beta<=alpha) break
        }
        return {score:minEval,move:bestMove}
    }
}

