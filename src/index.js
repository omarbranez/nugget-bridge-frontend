// const BASE_URL = 'http://localhost:3000'
const gameCanvas = document.getElementById("game-overlay")
const gameContext = gameCanvas.getContext("2d")
const teamCanvas = document.getElementById("team-container")
const teamContext = teamCanvas.getContext("2d")

let currentScreen = "title" 

function renderGameWindow() {
    gameCanvas.height = 512
    gameCanvas.width = 888//" //GBA is 1200x800, mine was 1721x800 for SCROLLING //old 400x860
    // const screens = ["title", "creation", "login", "options", "overworld", "battle", "result"]
    const gameBackground = new Image()
    switch (currentScreen) {
        case "title":
            gameBackground.src = "./assets/title-spritesheet.png"
            spritesheetAnimate(5, 41, 2220, 10250, gameBackground)
            break
        case "initial":
            gameBackground.src = "./assets/menu-gameBackground.png"
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
            gameBackground.src = "./assets/nugget-bridge-overworld.png"
            break
        case "battle":
            gameBackground.src = "./assets/nugget-bridge-battle.png"
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
    teamCanvas.height = 512
    teamCanvas.width = 888
    const bottomBackground = new Image()
    bottomBackground.src = "./assets/team-canvas-background.png"
    bottomBackground.onload = function() { 
        teamContext.drawImage(bottomBackground, 0, 0)
    }
    console.log("started from the bottom")
}

// controls are keyboard. maybe mouse too?
gameCanvas.addEventListener("keydown", function(e) {
    if ([13, 37, 38, 39, 40].indexOf(e.key) > -1){
        e.preventDefault(); // arrow keys and enter
    }
}, false);

function spritesheetAnimate(numColumns, numRows, sheetWidth, sheetHeight, bgImage) {
    // const gameContext = gameCanvas.getContext("2d")
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
    // debugger
    gameContext.drawImage(bgImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 0, 0, gameCanvas.width, gameCanvas.height);
    //Wait for next step in the loop
}, 100);
}

//check that nothing is hideously broken    
document.addEventListener('DOMContentLoaded', () => {
    console.log("anything")
    renderGameWindow()
    renderTeamWindow()
    
})