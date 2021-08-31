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

let menuState = "battle"

const gameButtonCanvas = document.getElementById("menu-buttons")
const gameButtonCanvasContext = gameButtonCanvas.getContext("2d")
// guessX = 0
// guessY = 0
// let buttons = []

function renderInitialMenu(){
    const newGameButton = new Image()
    newGameButton.src = "./assets/menu-button-new-game.png"
    const continueButton = new Image()
    continueButton.src = "./assets/menu-button-continue.png"
    // buttons.push(newGameButton, continueButton)
    // buttons.forEach(function(button){
    //     renderButton(button)
    // })
    renderButton(newGameButton, 375, 150, 200, 100) // fixed aspect ratio
    renderButton(continueButton, 375, 250, 200, 100)
    drawSelection()
    testSelection()
    console.log("new game menu rendering")
}
function menuButtonListener(e){
    let mouseX = e.x - gameButtonCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - gameButtonCanvas.offsetParent.offsetTop
    // console.log(mouseX, mouseY) //alerts if inside gameButtonCanvas
    // alert ( mouseX + "," + mouseY)
    if (menuState === "main") {
        if (mouseX >= 380 && mouseX <= 570 && mouseY >= 270 && mouseY <= 330) {
            alert("clicked continueButton")
        } else {
            if (mouseX >= 380 && mouseX <= 570 && mouseY >= 170 && mouseY <= 230) {
            alert("clicked newGameButton")
            }
        }
    } else {
        if (menuState === "battle") {
            if (mouseX >= 155 && mouseX <= 345 && mouseY >= 320 && mouseY <= 380) {
                alert("clicked fightButton")
            } else {
                if (mouseX >= 155 && mouseX <= 345 && mouseY >= 420 && mouseY <= 480) {
                    alert("clicked switchButton")
            } else {
                if (mouseX >= 555 && mouseX <= 745 && mouseY >= 420 && mouseY <= 480) {
                    alert("clicked quitButton")
                    }
                }   
            }   
        }
    }


     //continuebutton is 400, 270, 150, 60 
     // continueButton 
     // X > 400, X < 550
     // Y > 270, Y < 330
     // new button is 380, 170, 190, 60)
     // X > 400, X < 550
     // Y > 170, Y < 230
     //fight 155, 320, 190, 60
}

function renderButton(gameButton, xLocation, yLocation, width, height){
    gameButton.onload = function() {
        gameButtonCanvasContext.drawImage(gameButton, xLocation, yLocation, width, height)
    }
}

function drawSelection(){ //draws rectangle if chosen
    gameButtonCanvasContext.beginPath()
    gameButtonCanvasContext.lineWidth = "5"
    gameButtonCanvasContext.strokeStyle = "red"
    // gameButtonCanvasContext.rect(375, 150, 200, 100);
    // gameButtonCanvasContext.rect(380, 170, 190, 60)
    gameButtonCanvasContext.rect(155, 320, 190, 60) // fight button
    gameButtonCanvasContext.stroke()
    console.log("drew red rectangle over selection")
}

function testSelection(){ // see how big the clickable area is, for eventlisteners
    gameButtonCanvasContext.beginPath()
    gameButtonCanvasContext.lineWidth = "5"
    gameButtonCanvasContext.strokeStyle = "blue"
    gameButtonCanvasContext.rect(380, 270, 190, 60) //old clickable area for newgamebutton is 400, 170, 150, 60
    //continuebutton is 400, 270, 150, 60 AKA add 100 to Y location
    gameButtonCanvasContext.stroke()
    console.log("drew blue rectangle over clickable area")
}

function renderBattleButtons(){
    const fightButton = new Image()
    fightButton.src = "./assets/battle-fight-button.png"
    renderButton(fightButton, 150, 300, 200, 100)
    const switchButton = new Image()
    switchButton.src = "./assets/battle-switch-button.png"
    renderButton(switchButton, 150, 400, 200, 100)
    const quitButton = new Image()
    quitButton.src = "./assets/battle-save-quit-button.png"
    renderButton(quitButton, 550, 400, 200, 100)
    drawSelection()
    console.log("displaying battle buttons")
}