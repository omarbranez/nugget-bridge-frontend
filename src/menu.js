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
const gameButtonCanvas = document.getElementById("menu-buttons")
const gameButtonCanvasContext = gameButtonCanvas.getContext("2d")
function renderInitialMenu(){
    // gameButtonCanvas.height = 512
    // gameButtonCanvas.width = 888
    const initialMenuButton1 = new Image()
    initialMenuButton1.src = "./assets/menu-button-new-game.png"
    const initialMenuButton2 = new Image()
    initialMenuButton2.src = "./assets/menu-button-continue.png"
    // const overlayContext = gameCanvas.getContext("2d")
    initialMenuButton1.onload = function() {
        gameButtonCanvasContext.drawImage(initialMenuButton1, 400, 150, 150, 100)
    }
    initialMenuButton2.onload = function() {
        gameButtonCanvasContext.drawImage(initialMenuButton2, 400, 250, 150, 100)
    }
    console.log("i'm important too!")

}
