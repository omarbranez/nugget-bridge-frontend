// const BASE_URL = 'http://localhost:3000'
// document.addEventListener('DOMContentLoaded', () => {

// gameCanvas.addEventListener("keydown", function(e) {
//     if ([13, 37, 38, 39, 40].indexOf(e.key) > -1){
//         e.preventDefault(); // arrow keys and enter
//     }
// }, false);

const gameCanvas = document.getElementById("game-overlay")
const gameContext = gameCanvas.getContext("2d")

gameCanvas.height = 400
gameCanvas.width = 860//" //GBA is 1200x800, mine was 1721x800 for SCROLLING
const background = new Image()
background.src = "./assets/bridge-overworld.png"

background.onload = function(){
    gameContext.drawImage(background,0,0,860,400) }

console.log("anything")

const teamCanvas = document.getElementById("team-container")
const teamContext = teamCanvas.getContext("2d")
teamCanvas.height = 400
teamCanvas.width = 860

// }
// })