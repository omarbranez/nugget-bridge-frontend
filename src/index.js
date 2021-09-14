
const baseURL = 'http://localhost:3000'
const teamsURL = `${baseURL}/team_pokemons`
const pokemonsURL = `${baseURL}/pokemons`
const usersURL = `${baseURL}/users`
const movesURL = `${baseURL}/moves`

const gameBackgroundCanvas = document.getElementById("game-background")
const gameBackgroundContext = gameBackgroundCanvas.getContext("2d")

const gameButtonCanvas = document.getElementById("menu-buttons")
const gameButtonContext = gameButtonCanvas.getContext("2d")

const battlePokemonCanvas = document.getElementById("battle-pokemon")
const battlePokemonContext = battlePokemonCanvas.getContext("2d")
battlePokemonContext.font = "2em sans-serif";

const battleButtonCanvas = document.getElementById("battle-buttons")
const battleButtonContext = battlePokemonCanvas.getContext("2d")

const battleTextCanvas = document.getElementById("battle-text")
const battleTextContext = battleTextCanvas.getContext("2d")
battleTextContext.fillStyle = "white"
battleTextContext.font = "2em sans-serif"

const highlightCanvas = document.getElementById("highlight-button-top")
const highlightContext = highlightCanvas.getContext("2d")

const teamBackgroundCanvas = document.getElementById("team-background")
const teamBackgroundContext = teamBackgroundCanvas.getContext("2d")

const teamPokemonPicturesCanvas = document.getElementById("team-pokemon-pictures")
const teamPokemonPicturesContext = teamPokemonPicturesCanvas.getContext("2d")

const teamPokemonTextCanvas = document.getElementById("team-pokemon-text")
const teamPokemonTextContext = teamPokemonTextCanvas.getContext("2d")
teamPokemonTextContext.font = "1.2em sans-serif";

const teamHighlightCanvas = document.getElementById("team-highlight")
const teamHighlightContext = teamHighlightCanvas.getContext("2d")

const hpBarCanvas = document.getElementById("hp-bar")
const hpBarContext = hpBarCanvas.getContext("2d")
hpBarContext.font = '1em sans-serif'; 
hpBarContext.strokeStyle = "black";
// hpBarContext.fillStyle = "green";


let currentPlayer
let cpuPlayer
let currentPokemon
let currentCPUPokemon
let currentScreen = "initial" 
let ongoingBattle = false   
let playerTeam = []
let cpuTeam = []
let menuState = "initial"
let displayDialog 
let moveButton1 // will be button objects later
let moveButton2 // destructure these, i guess
let moveButton3
let moveButton4
let playerID = 1 //assuming login successful for userid 1
let cpuPlayerID = 2 //assuming cpu player fetched

function getPlayer(){
    console.log("i go first! fetching current user's team from the backend!")
    return fetch(`${usersURL}/${playerID}`)
    .then(res => res.json())
    .then(json => {
        if (json.data.id === String(playerID)) {
        currentPlayer = json.data
        for (const pokemon of json.data.attributes.myTeam){
            new Pokemon(pokemon)
        }
    }})
}

async function setPlayerTeam() {
    await getPlayer()
    console.log("i go second! setting the current user's team in the frontend!")
    for (const pokemon of Pokemon.all) {
        // if (pokemon.userID === currentPlayer.id){ // make a user object?
        if ((String(pokemon.userID) === currentPlayer.id)) {
            playerTeam.push(pokemon)
        }
    }
}

async function getCPUTeam(){
    await setPlayerTeam()
    console.log("i go third! fetching a CPU owned team from the backend!")
    return fetch(`${usersURL}/2`)
    .then(res => res.json())
    .then(json => {
        if (json.data.id === String(cpuPlayerID)) {
            cpuPlayer = json.data
        for (const pokemon of json.data.attributes.myTeam){
            new Pokemon(pokemon)
        }
    }})
}

async function setCPUTeam(){
    await getCPUTeam()
    console.log("i go fourth! setting the current CPU player's team in the frontend")
    for (const pokemon of Pokemon.all){
        if (String(pokemon.userID) === cpuPlayer.id) {
            cpuTeam.push(pokemon)
        }
    }
}

async function renderPlayerPokemon(){
    await setCPUTeam()
    console.log("i go fifth! rendering the rear view of the player's current pokemon!")
    currentPokemon = playerTeam[0]
    const currentPokemonRear = new Image()
    currentPokemonRear.src = `./assets/pokemon-battle/${currentPokemon.name.toLowerCase()}-rear.png`
    drawBattlePokemon(currentPokemonRear, 150, 140, 200, 200)
    battlePokemonContext.fillText(currentPokemon.name, 500, 250)
}

async function renderPlayerTeam(){
    await renderPlayerPokemon()
    console.log("i go sixth! rendering the mini pokemon in the team window below!")
    teamPokemonPicturesContext.clearRect(0, 0, 888, 512)
    // for (const pokemon of playerTeam) { set their locations depending on position
    // }
    let pokemonOnePic = new Image() //refactor this
    pokemonOnePic.src = `./assets/pokemon-battle/${playerTeam[0].name.toLowerCase()}-mini.png`
    renderFirstTeam(pokemonOnePic, 50, 50, 133, 100)
    teamPokemonTextContext.fillText(`${playerTeam[0].name}`, 200, 75)
    if (playerTeam[1]) {
        let pokemonTwoPic = new Image()
        pokemonTwoPic.src = `./assets/pokemon-battle/${playerTeam[1].name.toLowerCase()}-mini.png`
        renderFirstTeam(pokemonTwoPic, 50, 200, 133, 100)
        teamPokemonTextContext.fillText(`${playerTeam[1].name}`, 200, 225)
    }
    if (playerTeam[2]) {
        let pokemonThreePic = new Image()
        pokemonThreePic.src = `./assets/pokemon-battle/${playerTeam[2].name.toLowerCase()}-mini.png`
        renderFirstTeam(pokemonThreePic, 50, 350, 133, 100)
        teamPokemonTextContext.fillText(`${playerTeam[2].name}`, 200, 375)
    }
    if (playerTeam[3]) {
        let pokemonFourPic = new Image()
        pokemonFourPic.src = `./assets/pokemon-battle/${playerTeam[3].name.toLowerCase()}-mini.png`
        renderFirstTeam(pokemonFourPic, 500, 50, 133, 100)
        teamPokemonTextContext.fillText(`${playerTeam[3].name}`, 650, 75)
    }
    if (playerTeam[4]) {
        let pokemonFivePic = new Image()
        pokemonFivePic.src = `./assets/pokemon-battle/${playerTeam[4].name.toLowerCase()}-mini.png`
        renderFirstTeam(pokemonFivePic, 500, 200, 133, 100)
        teamPokemonTextContext.fillText(`${playerTeam[4].name}`, 650, 225)
    }
    if (playerTeam[5]) {
        let pokemonSixPic = new Image()
        pokemonSixPic.src = `./assets/pokemon-battle/${playerTeam[5].name.toLowerCase()}-mini.png`
        renderFirstTeam(pokemonSixPic, 500, 350, 133, 100)
        teamPokemonTextContext.fillText(`${playerTeam[5].name}`, 650, 375)
    }
}

async function renderCPUPokemon(){
    await renderPlayerTeam()
    console.log("i go seventh! rendering the front view of the CPU player's current pokemon!")
    currentCPUPokemon = cpuTeam[0]
    const currentPokemonFront = new Image()
    currentPokemonFront.src = `./assets/pokemon-battle/${currentCPUPokemon.name.toLowerCase()}-front.png`
    drawBattlePokemon(currentPokemonFront, 550, 20, 200, 200)
    battlePokemonContext.fillText(currentCPUPokemon.name, 175, 50)
}

async function renderBattleChain(){
    await drawHpBar()
    // debugger
    currentPokemon.createMoveButtons()
    // for (const pokemon of Pokemon.all){
    //     // debugger
    Pokemon.createPokemonButtons()
    // }
    console.log("i go last! i just start the chain!")
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
            staticDisplay(gameBackground)
            renderInitialMenu()
            console.log("calling menu.js")
            break
        case "creation":
            clearScreen()
            gameBackground.src = "./assets/menu-background.png"
            staticDisplay(gameBackground)
            renderNewUserModal()
            break
        case "options":
            gameBackground.src = "./assets/nugget-bridge-options.png"
            break
        case "login":
            gameBackground.src = "./assets/nugget-bridge-login.png"
            renderContinueModal()
            break
        case "overworld":
            clearScreen()
            gameBackground.src = "./assets/route-24-full.png"
            staticDisplay(gameBackground)
            console.log("rendering overworld")
            break
        case "battle": // this is being run first
            clearScreen()
            gameBackground.src = "./assets/battle-background-2.png"
            battleBackgroundDisplay(gameBackground)
            ongoingBattle = true
            renderBattleButtons()
            gameBackgroundContext.fillRect(0, 320, 888, 190)
            renderBattleChain()
            break
        case "result":
            gameBackground.src = "./assets/nugget-bridge-result.png"
            break
        default:
            gameBackground.src = "./assets/title-screen-logo.gif"
            console.log("top window loaded")
    }
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

function staticDisplay(bgImage) {
    bgImage.onload = function() {
        gameBackgroundContext.drawImage(bgImage, 0, 0, 888, 512)
        console.log("i'm displaying the static background!")
    }
}

function save(){
    let save = {
        userID: currentPlayer.userID,
        playerTeam: playerTeam,
        cpuTeam: cpuTeam, // specifically, the ID
        victories: victories,
    }
    return fetch(`${usersURL}/${userID}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': "application/json",
          "Accept": "application/json"
        },
          body: JSON.stringify(save)
        })
    .then(response => response.json())  
}
    // send update fetch request

function load(){
    // get fetch request for user data
    // add attribute for team player is currently battling
}
function renderNewUserModal(){
    const modal = document.getElementById("modal")
    modal.style.display="block"
    modal.innerHTML = `
    <h3>Create a new profile</h3>
    <form>
    <label for="username">Username:</label><br>
    <input type="text" name= "username"><br>
    <input type="submit" value="Log in"><br>
    </form>
    `
    modal.querySelector("form").addEventListener("submit", handleSubmit)
    // modal.open()
}
function renderContinueModal(){
    const modal = document.getElementById("modal")
    modal.style.display="block"
    modal.innerHTML = `
    <h3>Log in to your profile</h3>
    <form>
    <label for="name">Name:</label><br>
    <input type="text" name="name"><br>
    <input type="hidden" name="user_type" value="player">
    <input type="submit" value="Log in"><br>
    </form>
    `
    modal.querySelector("form").addEventListener("submit", handleSubmit)
    // modal.open()
}

function handleSubmit(e) {
    e.preventDefault()
    // let credentials = {
    //     name: e.target.username.value
    // }
    // debugger
    fetch(`${usersURL}`, {
        method: 'POST', 
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: e.target.username.value,
            user_type: "player"
        })
    })
    modal.style.display="none"
    // .then(response => response.json())
    // const modal = document.getElementById("modal")
    // modal.style.display="none"
        
        
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
    highlightContext.beginPath()
    highlightContext.lineWidth = "5"
    highlightContext.strokeStyle = "red"
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


function drawBattlePokemon(pokemon, xLocation, yLocation, width, height){
    pokemon.onload = function() {
        battlePokemonContext.drawImage(pokemon, xLocation, yLocation, width, height)
    }
} // this can probably just be a draw all objects thing

//check that nothing is hideously broken    
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")
    renderGameWindow()
    renderTeamWindow()
    // debugger
    gameButtonCanvas.addEventListener('click', menuButtonListener, false)    // clickedButton()
    gameButtonCanvas.addEventListener('mousemove', highlightButtonListener, false)
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
