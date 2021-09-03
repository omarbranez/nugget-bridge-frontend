const gameBackgroundCanvas = document.getElementById("game-background")
const gameBackgroundContext = gameBackgroundCanvas.getContext("2d")
const teamBackgroundCanvas = document.getElementById("team-background")
const teamBackgroundContext = teamBackgroundCanvas.getContext("2d")
const teamPokemonPicturesCanvas = document.getElementById("team-pokemon-pictures")
const teamPokemonPicturesContext = teamPokemonPicturesCanvas.getContext("2d")
const teamPokemonTextCanvas = document.getElementById("team-pokemon-text")
const teamPokemonTextContext = teamPokemonTextCanvas.getContext("2d")


var canvas = document.getElementsByTagName("canvas")

let currentScreen = "battle" 
let ongoingBattle = false   

function renderGameWindowOverlay(){

}

function renderGameWindow() {
    gameBackgroundCanvas.height = 512
    gameBackgroundCanvas.width = 888
    // const screens = ["title", "creation", "login", "options", "overworld", "battle", "result"]

    let gameBackground = new Image()
    
    switch (currentScreen) {
        case "title":
            clearScreen()
            gameBackground.src = "./assets/title-spritesheet.png"
            spritesheetAnimate(5, 41, 2220, 10250, gameBackground)
            break
        case "initial":
            clearScreen()
            gameBackground.src = "./assets/menu-background.png"
            // debugger
            staticDisplay(gameBackground)
            renderInitialMenu()
            console.log("calling menu.js")
            break
        case "creation":
            gameBackground.src = "./assets/nugget-bridge-creation.png"
            break
        case "options":
            gameBackground.src = "./assets/nugget-bridge-options.png"
            break
        case "login":
            gameBackground.src = "./assets/nugget-bridge-login.png"
            break
        case "overworld":
            clearScreen()
            gameBackground.src = "./assets/route-24-full.png"
            staticDisplay(gameBackground)
            console.log("rendering overworld")
            break
        case "battle":
            clearScreen()
            gameBackground.src = "./assets/battle-background-1.png"
            battleBackgroundDisplay(gameBackground)
            // spritesheetStatic(3, 4, 737, 466, gameBackground)
            ongoingBattle = true
            renderBattleButtons()
            renderPlayerPokemon()
            renderCPUPokemon()
            renderPlayerTeam()
            drawHpBar()
            // renderTeamWindowText()
            break
        case "result":
            gameBackground.src = "./assets/nugget-bridge-result.png"
            break
        default:
            gameBackground.src = "./assets/title-screen-logo.gif"
    }
    console.log("im all the way up!")
}

function renderTeamWindow() {
    teamBackgroundCanvas.height = 512
    teamBackgroundCanvas.width = 888
    const bottomBackground = new Image()
    bottomBackground.src = "./assets/team-canvas-background.png"
    bottomBackground.onload = function() { 
        teamBackgroundContext.drawImage(bottomBackground, 0, 0)
    }
    console.log("started from the bottom")
}

// controls are keyboard. maybe mouse too?
// gameBackgroundCanvas.addEventListener("keydown", function(e) {
//     if ([13, 37, 38, 39, 40].indexOf(e.key) > -1){
//         e.preventDefault(); // arrow keys and enter
//     }
// }, false);


function spritesheetAnimate(numColumns, numRows, sheetWidth, sheetHeight, bgImage) {
    // const gameBackgroundContext = gameBackgroundCanvas.getContext("2d")
    // clearScreen()
    let frameWidth = sheetWidth / numColumns //2220
    let frameHeight = sheetHeight / numRows // 10250
    let currentFrame = 0;
    setInterval( function() { // animate spritesheet
        currentFrame++ // pick new frame
        let maxFrame = numColumns * numRows - 1
        if (currentFrame > maxFrame){ // loop frames
            currentFrame = 0
        }
        let column = currentFrame % numColumns // update rows and columns
        let row = Math.floor(currentFrame / numColumns) // Clear and draw
        gameBackgroundContext.drawImage(bgImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 0, 0, gameBackgroundCanvas.width, gameBackgroundCanvas.height)
    }, 100)    //wait for next step in the loop
}

function staticDisplay(bgImage) {
    bgImage.onload = function() {
        gameBackgroundContext.drawImage(bgImage, 0, 0, 888, 512)
        console.log("i'm displaying the static background!")
    }
}

// function spritesheetStatic(numColumns, numRows, sheetWidth, sheetHeight, bgImage){
//     let frameWidth = sheetWidth / numColumns
//     let frameHeight = sheetHeight / numRows
//     let 
// }

function battleBackgroundDisplay(bgImage) {
    bgImage.onload = function() {
        gameBackgroundContext.drawImage(bgImage, 0, 0, 888, 320)
        console.log("i'm displaying the battle background!")
    }
}

function clearScreen() {
    gameBackgroundContext.clearRect(0, 0, gameBackgroundCanvas.width, gameBackgroundCanvas.height)
    console.log("clearing the screen!")
}

//check that nothing is hideously broken    
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")
    renderGameWindow()
    renderTeamWindow()
    gameButtonCanvas.addEventListener('click', menuButtonListener, false)    // clickedButton()
    gameButtonCanvas.addEventListener('click', (e)=>{
        console.log(e.clientX - 8, e.clientY - 39)})
})
