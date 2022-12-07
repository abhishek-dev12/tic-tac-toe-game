const playboard = document.querySelectorAll('[data-cell]')
const winMessageBox = document.getElementById('player-div-id')
const winBox = document.getElementById('win-popup')
const resetBtn = document.getElementById('reset-btn')
const playerOne = document.getElementById('player-one-value')
const playerTwo = document.getElementById('player-two-value')
const ModelBox = document.getElementById('model-id')
const inputOne = document.getElementById('input-box-one')
const inputTwo = document.getElementById('input-box-two')
const bodyBlur = document.getElementById('container-blur')
const play = document.getElementById('play-again')
const errorFirst = document.getElementById('name-error-first')
const errorSecond = document.getElementById('name-error-second')
const xTurn = 'X'
const OTurn = 'O'
let turn 
let draw
let winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let activePlayerFirst = document.getElementById('active-player-1')
let activePlayerSecond = document.getElementById('active-player-2')
activePlayerFirst.classList.add('activePlayer')


// showing welcome Model box 
Model()

function Model(){
    window.onload = setTimeout(() => {
        ModelBox.style.display = 'block'
        bodyBlur.classList.add('active')
        inputOne.value = ''
        inputTwo.value = ''
     }, 500)
}

// closing Model box
document.getElementById('enter-btn').addEventListener('click', () => {
       playerOne.innerText = `${inputOne.value} - X`
       playerTwo.innerText = ` ${inputTwo.value} - O`
     
       if(inputOne.value && !inputTwo.value){
             errorSecond.style.display = 'block'
             
       } else if(!inputOne.value && inputTwo.value){
            
        errorFirst.style.display = 'block'
       
 } else if(!inputOne.value || !inputTwo.value){
        errorFirst.style.display = 'block'
        errorSecond.style.display = 'block'
       }else {
        ModelBox.style.display = 'none'
        bodyBlur.classList.remove('active')
       }
})

// reset btn
resetBtn.addEventListener('click', startGame)

// play again btn on win message box
play.addEventListener('click', () => {
    winBox.style.display = 'none'
    bodyBlur.classList.remove('active')
    startGame()
})

startGame()

function startGame(){
   playboard.forEach(box => {
    box.innerText = ''
   });
playboard.forEach(boxes => {
    boxes.addEventListener('click', handlefunction, {once : true})
});
}


// function for controling game click
function handlefunction(e) {
    const cell = e.target
   let currentTurn = turn ? OTurn : xTurn
   
   cell.innerText = currentTurn

   if(win(currentTurn)){
    winnerMessage(currentTurn)
} else if(drawFunction()){
    winMessageBox.innerText = `Oops it's draw`
    winBox.style.display = 'block'
    bodyBlur.classList.add('active')
}

    turn = !turn

  if(currentTurn == xTurn){
        activePlayerSecond.classList.add('activePlayer')
        activePlayerFirst.classList.remove('activePlayer')
    } else {
        activePlayerFirst.classList.add('activePlayer')
        activePlayerSecond.classList.remove('activePlayer')
    }

    
}


// winning function

function win(currentTurn){
   return winCombination.some(combinatin => {
    return combinatin.every(index => {
        return playboard[index].innerText == currentTurn
    })
   })
}

// draw function

function drawFunction(){
 return [...playboard].every(cell => {
    return cell.innerText == xTurn || cell.innerText == OTurn 
 })   
}

// winning message box

function winnerMessage(currentTurn){
    if(currentTurn == xTurn){
    winMessageBox.innerText = `${playerOne.innerHTML} won`
}else{
    winMessageBox.innerText = `${playerTwo.innerHTML} won`
}
   winBox.style.display = 'block'
   bodyBlur.classList.add('active')
}



// reset board to play again


