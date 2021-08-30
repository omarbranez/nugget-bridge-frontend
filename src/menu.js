// let newMenu
//      render form to enter name
//
// let newMenuValid
//      check if form has value for name
//      if true
//          generate password for user
//          post both name and password to db
//          set screen state to "environment" (or maybe welcome?)
//      else
//          reset form
//          display error message
//
// let loginMenu
//      render form to enter password
//
// let loginMenuValid
//      check if password is valid in db
//      if true
//          set screen state to "environment" (or maybe welcome?)
//
//  let teamMenu
//      render names and hp of pokemon in team
//  
//  let overlayMenu
//      render options such as exit
//
// 

// const { clear } = require("console");

let menuState = "main"

const gameButtonCanvas = document.getElementById("menu-buttons")
const gameButtonCanvasContext = gameButtonCanvas.getContext("2d")

function renderInitialMenu(){
    // let buttons = [newGameButton, continueButton]
    const newGameButton = new Image()
    newGameButton.src = "./assets/menu-button-new-game.png"
    const continueButton = new Image()
    continueButton.src = "./assets/menu-button-continue.png"
    // const overlayContext = gameCanvas.getContext("2d")
    renderButton(newGameButton, 400, 150, 150, 100)
    renderButton(continueButton, 400, 250, 150, 100)
    // gameButtonCanvas.addEventListener()
    drawSelection()
    testSelection()
    
    console.log("new game menu rendering")

}

function renderButton(gameButton, xLocation, yLocation, width, height){
    gameButton.onload = function() {
        gameButtonCanvasContext.drawImage(gameButton, xLocation, yLocation, width, height)
    }
}
// function initialMenuSelect() {
//     gameButtonCanvasLeft
// }

function drawSelection(){ //draws rectangle if chosen
    gameButtonCanvasContext.beginPath();
    gameButtonCanvasContext.lineWidth = "6";
    gameButtonCanvasContext.strokeStyle = "red";
    gameButtonCanvasContext.rect(375, 150, 200, 100);
    gameButtonCanvasContext.stroke();
    console.log("drew red rectangle over selection")
}

function testSelection(){ // see how big the clickable area is, for eventlisteners
    gameButtonCanvasContext.beginPath();
    gameButtonCanvasContext.lineWidth = "6";
    gameButtonCanvasContext.strokeStyle = "blue";
    gameButtonCanvasContext.rect(400, 270, 150, 60); //clickable area for newgamebutton is 400, 170, 150, 60
    //continuebutton is 400, 270, 150, 60 AKA add 100 to Y location
    gameButtonCanvasContext.stroke();
    console.log("drew blue rectangle over clickable area")
}

