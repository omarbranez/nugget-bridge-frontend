// const BASE_URL = 'http://localhost:3000'
// document.addEventListener('DOMContentLoaded', () => {

const gameCanvas = document.getElementById("game-overlay")
const gameContext = gameCanvas.getContext("2d")

gameCanvas.height = 400
gameCanvas.width = 860//" //GBA is 1200x800, mine was 1721x800 for SCROLLING


const teamCanvas = document.getElementById("team-container")
const teamContext = teamCanvas.getContext("2d")
teamCanvas.height = 400
teamCanvas.width = 860

// change the background depending on the program state
const screens = ["title", "creation", "login", "overworld", "battle", "result"]
const background = new Image()
background.src = "./assets/title-screen-logo.gif" // need to convert to sprite sheet
let currentScreen = "title"
switch (currentScreen) {
    case "title":
        background.src = "./assets/nugget-bridge-title-spritesheet.png"
        break
    case "creation":
        background.src = "./assets/nugget-bridge-creation.png"
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
background.onload = function(){
    gameContext.drawImage(background,0,0,860,400) }

controls are keyboard. maybe mouse too?
gameCanvas.addEventListener("keydown", function(e) {
    if ([13, 37, 38, 39, 40].indexOf(e.key) > -1){
        e.preventDefault(); // arrow keys and enter
    }
}, false);

//check that nothing is hideously broken    
console.log("anything")


