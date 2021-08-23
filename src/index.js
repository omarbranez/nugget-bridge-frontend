// const BASE_URL = 'http://localhost:3000'
// document.addEventListener('DOMContentLoaded', () => {

// gameCanvas is where the game itself will be displayed
const gameCanvas = document.getElementById("game-overlay")
const gameContext = gameCanvas.getContext("2d")
gameCanvas.height = 512
gameCanvas.width = 888//" //GBA is 1200x800, mine was 1721x800 for SCROLLING //old 400x860

// teamCanvas is where the player's team will be permanently displayed
const teamCanvas = document.getElementById("team-container")
const teamContext = teamCanvas.getContext("2d")
teamCanvas.height = 512
teamCanvas.width = 888

// change the background depending on the program state
let currentScreen = "title" // upon load, is title screen
const screens = ["title", "creation", "login", "options", "overworld", "battle", "result"]
const background = new Image()
// background.src = "./assets/title-screen-logo.gif" // need to convert to sprite sheet
switch (currentScreen) {
    case "title":
        background.src = "./assets/title-spritesheet.png"
        break
    case "creation":
        background.src = "./assets/nugget-bridge-creation.png"
        break
    case "options":
        background.src = "./assets/nugget-bridge-options.png"
        break
    case "login":
        background.src = "./assets/nugget-bridge-login.png"
        break
    case "overworld":
        background.src = "./assets/nugget-bridge-overworld.png"
        break
    case "battle":
        background.src = "./assets/nugget-bridge-battle.png"
        break
    case "result":
        background.src = "./assets/nugget-bridge-result.png"
        break
    default:
        background.src = "./assets/title-screen-logo.gif"
}
// background.onload = function(){
//     gameContext.drawImage(background,0,0,860,400) }

// controls are keyboard. maybe mouse too?
gameCanvas.addEventListener("keydown", function(e) {
    if ([13, 37, 38, 39, 40].indexOf(e.key) > -1){
        e.preventDefault(); // arrow keys and enter
    }
}, false);


let numColumns = 5
let numRows = 41
// Define the size of a frame EACH IS 444 WIDTH 256 HEIGHT for title-spritesheet
let frameWidth = 2220 / numColumns;; //2220
let frameHeight = 10250 / numRows;; // 10250

// The sprite image frame starts from 0
let currentFrame = 0;
setInterval( function() { // animate spritesheet
    currentFrame++ // pick new frame
    let maxFrame = numColumns * numRows - 1
    if (currentFrame > maxFrame){ // loop frames
        currentFrame = 0
    }
    let column = currentFrame % numColumns // update rows and columns
    let row = Math.floor(currentFrame / numColumns) // Clear and draw
    gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameContext.drawImage(background, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 0, 0, gameCanvas.width, gameCanvas.height);
    //Wait for next step in the loop
}, 100);


// })
//check that nothing is hideously broken    
console.log("anything")


