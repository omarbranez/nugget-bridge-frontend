const baseURL = 'http://localhost:3000'
const teamsURL = `${baseURL}/team_pokemons`
const pokemonsURL = `${baseURL}/pokemons`
const usersURL = `${baseURL}/users`

const gameBackgroundCanvas = document.getElementById("game-background")
const gameBackgroundContext = gameBackgroundCanvas.getContext("2d")
const highlightCanvas = document.getElementById("highlight-button-top")
const highlightContext = highlightCanvas.getContext("2d")

const teamBackgroundCanvas = document.getElementById("team-background")
const teamBackgroundContext = teamBackgroundCanvas.getContext("2d")
const teamPokemonPicturesCanvas = document.getElementById("team-pokemon-pictures")
const teamPokemonPicturesContext = teamPokemonPicturesCanvas.getContext("2d")
const teamPokemonTextCanvas = document.getElementById("team-pokemon-text")
const teamPokemonTextContext = teamPokemonTextCanvas.getContext("2d")
const teamHighlightCanvas = document.getElementById("team-highlight")
const teamHighlightContext = teamHighlightCanvas.getContext("2d")
var canvas = document.getElementsByTagName("canvas")

let currentScreen = "battle" 
let ongoingBattle = false   
let playerTeam = []
function renderGameWindowOverlay(){

}

function renderGameWindow() {
    gameBackgroundCanvas.height = 512
    gameBackgroundCanvas.width = 888
    // const screens = ["title", "creation", "login", "options", "overworld", "battle", "result"]
    gameBackgroundContext.fillStyle = "#285068"
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
            gameBackground.src = "./assets/battle-background-2.png"
            battleBackgroundDisplay(gameBackground)
            // spritesheetStatic(3, 4, 737, 466, gameBackground)
            ongoingBattle = true
            // setPlayerTeam()
            renderBattleButtons()
            renderPlayerPokemon()
            renderCPUPokemon()
            renderPlayerTeam()
            gameBackgroundContext.fillRect(0, 320, 888, 190)
            drawHpBar()
            // renderTeamWindowText()
            break
        case "result":
            gameBackground.src = "./assets/nugget-bridge-result.png"
            break
        default:
            gameBackground.src = "./assets/title-screen-logo.gif"
    }
    console.log("top window loaded")
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

function drawSelection(x, y, dx, dy) { //draws rectangle if chosen
    // console.log("loaded")
    highlightContext.beginPath()
    highlightContext.lineWidth = "5"
    highlightContext.strokeStyle = "red"
    // gameButtonContext.rect(375, 150, 200, 100);
    // gameButtonContext.rect(380, 170, 190, 60)
    //gameButtonContext.rect(155, 445, 190, 60) // fight button
    highlightContext.rect(x, y, dx, dy)
    highlightContext.stroke()
    // console.log("drew red rectangle over selection")
}

function teamDrawSelection(x, y, dx, dy) {
    teamHighlightContext.beginPath()
    teamHighlightContext.lineWidth = "5"
    teamHighlightContext.strokeStyle = "red"
    teamHighlightContext.rect(x, y, dx, dy)
    teamHighlightContext.stroke()
}

// function clearSelection(x, y, dx, dy){
//     highlightContext.clearRect(x, y, dx, dy)
// }

function highlightButton(e) {
    // console.log("loaded")
    let mouseX = e.x - highlightCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - highlightCanvas.offsetParent.offsetTop
    if (mouseX > 155  && mouseX < 345  && mouseY >= 445   && mouseY <= 505 ){
        highlightContext.clearRect(0, 0, 888, 512)
        drawSelection(155, 445, 190, 60)
        // alert("highlighting fight button!")
    } else {
        if (mouseX > 355  && mouseX < 555  && mouseY >= 445  && mouseY <= 505 ) {
            highlightContext.clearRect(0, 0, 888, 512)
            drawSelection(355, 445, 190, 60)
            // alert("highlighting switch button")
        } else {
            if (mouseX > 555  && mouseX < 745  && mouseY >= 445  && mouseY <= 505 ) {
                highlightContext.clearRect(0, 0, 888, 512)
                drawSelection(555, 445, 190, 60)
                // alert("highlighting quit button")
            } else {
                highlightContext.clearRect(0, 0, 888, 512)
            }
        }
    }
}

function animatePokemon(e) { // interval will go into render team
    let mouseX = e.clientX// - teamHighlightCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.clientY// - teamHighlightCanvas.offsetParent.offsetTop
    if (mouseX > 160 && mouseX < 260 && mouseY > 600 && mouseY < 700) {
        console.log("JUMPING")
        hopOn = true
        // requestAnimationFrame(hopper)
    } else {
        hopOn = false
    }
}

function setPlayerTeam(){
    return fetch(`${usersURL}/1`)
    .then(res => res.json())
    .then(json => {
        for (const pokemon of json.data.attributes.myTeam){
            // debugger
            playerTeam.push(pokemon)
            // debugger
            // currentPokemon = playerTeam.first
        }
    })
}
//check that nothing is hideously broken    
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")
    setPlayerTeam()
    renderGameWindow()
    renderTeamWindow()
    // debugger
    gameButtonCanvas.addEventListener('click', menuButtonListener, false)    // clickedButton()
    gameButtonCanvas.addEventListener('mousemove', highlightButton, false)
    teamHighlightCanvas.addEventListener('mousemove', animatePokemon, false)
    // teamHighlightCanvas.addEventListener('mouseout',  clearInterval(hop), false)
    // window.addEventListener('mouseover', animatePokemon, false)
    // gameButtonCanvas.addEventListener('click', (e)=>{
    //     console.log(e.clientX - 8, e.clientY - 39)})   
    // window.onmousemove = function(e){console.log("mouse location:", e.clientX 2, e.clientY - 31)}
    // gameButtonCanvas.addEventListener("mouseout", (e))
    // drawSelection(155, 445, 190, 60) // buttons
    teamDrawSelection(70, 50, 100, 100)
    teamDrawSelection(70, 200, 100, 100)
    teamDrawSelection(70, 350, 100, 100)
    teamDrawSelection(520, 50, 100, 100)
    teamDrawSelection(520, 200, 100, 100)
    teamDrawSelection(520, 350, 100, 100)
})
