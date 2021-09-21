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
battlePokemonContext.font = "1.33em sans-serif";

const battleButtonCanvas = document.getElementById("battle-buttons")
const battleButtonContext = battlePokemonCanvas.getContext("2d")

const battleTextCanvas = document.getElementById("battle-text")
const battleTextContext = battleTextCanvas.getContext("2d")
battleTextContext.fillStyle = "white"
battleTextContext.font = "1.33em sans-serif"

const highlightCanvas = document.getElementById("highlight-button-top")
const highlightContext = highlightCanvas.getContext("2d")

const teamBackgroundCanvas = document.getElementById("team-background")
const teamBackgroundContext = teamBackgroundCanvas.getContext("2d")

const teamPokemonPicturesCanvas = document.getElementById("team-pokemon-pictures")
const teamPokemonPicturesContext = teamPokemonPicturesCanvas.getContext("2d")

const teamPokemonTextCanvas = document.getElementById("team-pokemon-text")
const teamPokemonTextContext = teamPokemonTextCanvas.getContext("2d")
teamPokemonTextContext.font = "0.8em sans-serif";

const teamHighlightCanvas = document.getElementById("team-highlight")
const teamHighlightContext = teamHighlightCanvas.getContext("2d")

const hpBarCanvas = document.getElementById("hp-bar")
const hpBarContext = hpBarCanvas.getContext("2d")
hpBarContext.font = '.66em sans-serif'; 
hpBarContext.strokeStyle = "black";
// hpBarContext.fillStyle = "green";


let playerID
let player 
let cpu 

let currentScreen = "title" 
let menuState = "title"
let spriteVersion = "diamond-pearl"

let ongoingBattle = false   

let battle // the battle object

let faintedPokemon = []
let titleAnimator
let response
let result
let mourner

let attack = new Message()
let missed = new Message()
let effective = new Message()
let critical = new Message()
let faint = new Message()
// let counter = 0
// let anim
// let counter

function getPlayer(){
    console.log("i go first! fetching a user and their team from the backend!")
    return fetch(`${usersURL}/${playerID}`)
    .then(res => res.json())
    .then(json => {
        player = new Player(json.data)
        for (const pokemon of json.included){
            // debugger
            let poke = new Pokemon(pokemon)
            player.team.push(poke)
        }
        player.team.sort(sortTeam)
        player.currentPokemon = player.team[0]

    })
}

function getCPU(){ //async
    console.log("i go second! fetching a cpu and their team from the backend!")
    return fetch(`${usersURL}/${String(parseInt(playerID)+1)}`) // this will work for the first battle, i guess
    .then(res => res.json())
    .then(json => {
        cpu = new Player(json.data)
        for (const pokemon of json.included){
            let poke = new Pokemon(pokemon)
            cpu.team.push(poke)
            // debugger
        }
        player.team.sort(sortTeam)
        cpu.currentPokemon = cpu.team[0]
    })
}

function renderPokemon(side){ //async
    // debugger
    const pokemonBattleImage = new Image()
    if (side == "player"){
        pokemonBattleImage.src = `./assets/pokemon/${spriteVersion}/back/${player.currentPokemon.pokemonID}.png`
        drawBattlePokemon(pokemonBattleImage, 100, 93, 150, 150)
        battlePokemonContext.fillText(player.currentPokemon.name, 333, 167)
    } else {
        pokemonBattleImage.src = `./assets/pokemon/${spriteVersion}/front/${cpu.currentPokemon.pokemonID}.png`
        drawBattlePokemon(pokemonBattleImage, 367, 13, 150, 150)
        battlePokemonContext.fillText(cpu.currentPokemon.name, 117, 33)
    }
    console.log("i go third! rendering the views of both the player's and cpu's current pokemon")

}

function createMoveButtons() { 
    Button.all = []
    for (const move of [player.currentPokemon.move1, player.currentPokemon.move2, player.currentPokemon.move3, player.currentPokemon.move4]){
        new Button(move.name, "./assets/button-blank.png", 133, 66, move.name, "move-select")
    }
    // debugger
    Object.assign(Button.find(player.currentPokemon.move1.name), {
        xStart: 233,
        yStart: 217,
        textX: 263,
        textY: 257,
        percent: 1
    })
    Object.assign(Button.find(player.currentPokemon.move2.name), {
        xStart: 233,
        yStart: 283,
        textX: 263,
        textY: 323,
        percent: 1
    })
    Object.assign(Button.find(player.currentPokemon.move3.name), {
        xStart: 367,
        yStart: 217,
        textX: 397,
        textY: 257,
        percent: 1
    })
    Object.assign(Button.find(player.currentPokemon.move4.name), {
        xStart: 367,
        yStart: 283,
        textX: 397,
        textY: 323,
        percent: 1
    })
    
}

function createPokemonButtons() { // 
    for (const pokemon of Pokemon.all){
        if (String(pokemon.userID) === playerID){
            new Button(pokemon.name, "./assets/button-blank.png", 133, 66, pokemon.name, "pokemon-select")
        }
    }
    if (!!player.team[0]){   
        Object.assign(Button.find(player.team[0].name), { // position vs player team
            xStart: 233,
            yStart: 213,
            textX: 257, // 6 letter Moltres // position 1 // we can probably assign the different textX with a loop
            textY: 243,
            percent: 0.75
        })
    }   
    if (!!player.team[1]){
        Object.assign(Button.find(player.team[1].name), { // position vs player team
            xStart: 233,
            yStart: 253,
            textX: 243, // 10 letter Weepinbell // position 2
            textY: 283,
            percent: 0.75
        })
    }
    if (!!player.team[2]){
        Object.assign(Button.find(player.team[2].name), { // position vs player team
            xStart: 233,
            yStart: 293,
            textX: 267, // 4 letter Jynx // position 3
            textY: 323,
            percent: 0.75
        })
    }
    if (!!player.team[3]){
        Object.assign(Button.find(player.team[3].name), { // position vs player team
            xStart: 367,
            yStart: 213,
            textX: 391, // 6 letter Snorlax // position 4
            textY: 243,
            percent: 0.75
        })
    }
    if (!!player.team[4]){
        Object.assign(Button.find(player.team[4].name), { // position vs player team
            xStart: 367,
            yStart: 253,
            textX: 391, // 7 letter Rattata // position 5
            textY: 283,
            percent: 0.75
        })
    }
    if (!!player.team[5]){
        Object.assign(Button.find(player.team[5].name), { // position vs player team
            xStart: 367,
            yStart: 293,
            textX: 391, // 6 letter Rhydon // position 6
            textY: 323,
            percent: 0.75
        })
    }
}

function renderGameWindow() {
    gameBackgroundCanvas.height = 338
    gameBackgroundCanvas.width = 586
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
        // case "creation":
        //     clearScreen()
        //     gameBackground.src = "./assets/menu-background.png"
        //     staticDisplay(gameBackground)
        //     renderNewUserModal()
        //     break
        // case "options":
        //     gameBackground.src = "./assets/nugget-bridge-options.png"
        //     break
        // case "login":
        //     gameBackground.src = "./assets/nugget-bridge-login.png"
        //     renderContinueModal()
        //     break
        // case "overworld":
        //     clearScreen()
        //     gameBackground.src = "./assets/route-24-full.png"
        //     staticDisplay(gameBackground)
        //     console.log("rendering overworld")
        //     break
        case "battle": 
            clearScreen()
            gameBackground.src = "./assets/battle-background-2.png"
            battleBackgroundDisplay(gameBackground)
            ongoingBattle = true
            renderBattleButtons()
            gameBackgroundContext.fillRect(0, 213, 586, 126)
            getPlayer()
            .then(getCPU)
            .then(renderPokemon.bind(null, "player"))
            .then(renderPokemon.bind(null, "cpu"))
            .then(renderMiniPics)
            .then(drawHpBar)
            .then(createMoveButtons)
            .then(createPokemonButtons)
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
    teamBackgroundCanvas.height = 338
    teamBackgroundCanvas.width = 586
    const bottomBackground = new Image()
    bottomBackground.src = "./assets/team-canvas-background.png"
    bottomBackground.onload = function() { 
        teamBackgroundContext.drawImage(bottomBackground, 0, 0, teamBackgroundCanvas.width, teamBackgroundCanvas.height)
    }
    console.log("started from the bottom")
}

function staticDisplay(bgImage) {
    bgImage.onload = function() {
        gameBackgroundContext.drawImage(bgImage, 0, 0, gameBackgroundCanvas.width, gameBackgroundCanvas.height)
        console.log("i'm displaying the static background!")
    }
}

// function save(){
//     let save = {
//         userID: player.userID,
//         player.team: player.team,
//         cpuTeam: cpuTeam, // specifically, the ID
//         victories: victories,
//     }
//     return fetch(`${usersURL}/${userID}`, {
//         method: 'PUT', 
//         headers: {
//           'Content-Type': "application/json",
//           "Accept": "application/json"
//         },
//           body: JSON.stringify(save)
//         })
//     .then(response => response.json())  
// }
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
    <input type="text" name= "name"><br>
    <input type="submit" value="Log in"><br>
    </form>
    `
    modal.querySelector("form").addEventListener("submit", handleNewUser)
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
    <input type="submit" value="Log in"><br>
    </form>
    `
    modal.querySelector("form").addEventListener("submit", handleContinue)
    // modal.open()
}

function handleNewUser(e) {
    e.preventDefault()
    modal.style.display="none"
    fetch(`${usersURL}`, {
        method: 'POST', 
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: e.target.name.value,
            user_type: "player"
        })
    })
        .then(res => res.json())
        .then(user => {playerID = user.data.id})// this takes a while. maybe a progress bar?    
        .then(()=>{
            clearScreen()
            currentScreen = "battle"
            menuState = "battle-options"
            setTimeout(()=>renderGameWindow(), 50)
        })
}

function handleContinue(e){
    e.preventDefault()
    modal.style.display = "none"
    fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: e.target.name.value,
        })
    })
    .then(res => res.json())
    .then(user => {
        playerID = user.data.id
        alert(`Welcome back, ${user.data.attributes.name}`)
        clearScreen()
        currentScreen = "battle"
        menuState = "battle-options"
        setTimeout(()=>renderGameWindow(), 50)
    })
}
// function spritesheetStatic(numColumns, numRows, sheetWidth, sheetHeight, bgImage){
//     let frameWidth = sheetWidth / numColumns
//     let frameHeight = sheetHeight / numRows
//     let 
// }

function battleBackgroundDisplay(bgImage) {
    bgImage.onload = function() {
        gameBackgroundContext.drawImage(bgImage, 0, 0, teamBackgroundCanvas.width, 213)
        console.log("i'm displaying the battle background!")
    }
}

function clearScreen() {
    gameBackgroundContext.clearRect(0, 0, gameBackgroundCanvas.width, gameBackgroundCanvas.height)
    gameButtonContext.clearRect(0,0,gameButtonCanvas.width,gameButtonCanvas.height)
    teamPokemonPicturesContext.clearRect(0,0,teamPokemonPicturesCanvas.width, teamPokemonPicturesCanvas.height)
    teamPokemonTextContext.clearRect(0,0,teamPokemonTextCanvas.width,teamPokemonTextCanvas.height)
    battlePokemonContext.clearRect(0,0,battlePokemonCanvas.width,battlePokemonCanvas.height)
    hpBarContext.clearRect(0,0,hpBarCanvas.width,hpBarCanvas.height) 
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
    if (mouseX > 160 && mouseX < 260 && mouseY > 586 && mouseY < 700) {
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

function titleHandler(e){
    e.preventDefault()
    // debugger
    if (e.code == 'Enter' && currentScreen === "title"){
        // alert('Enter is pressed')
        currentScreen = "initial"
        menuState = "initial"
        removeEventListener('keyup', titleHandler)
        clearInterval(titleAnimator)
        setTimeout(()=>renderGameWindow(), 50)
    }
}

 
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")
    currentScreen = "title"
    menuState = "title"
    renderGameWindow()
    renderTeamWindow()
    window.addEventListener('keyup', titleHandler)
    gameButtonCanvas.addEventListener('click', menuButtonListener)
    gameButtonCanvas.addEventListener('dblclick', switchButtonListener)    // clickedButton()
    gameButtonCanvas.addEventListener('mousemove', highlightButtonListener) // can i combine all these?
    teamHighlightCanvas.addEventListener('mousemove', animatePokemon)
    teamDrawSelection(47, 33, 66, 66) //70, 50, 100, 100
    teamDrawSelection(47, 133, 66, 66) // 70, 200, 50, 50
    teamDrawSelection(47, 233, 66, 66) // 70, 350, 50, 50
    teamDrawSelection(347, 33, 66, 66) //520, 50, 50, 50
    teamDrawSelection(347, 133, 66, 66)//520, 200, 50, 50
    teamDrawSelection(347, 233, 66, 66)//520, 350, 50, 50
})

function sortTeam(a, b){
    if (a.position < b.position){
        return -1
    }
    if (a.position > b.position){
        return 1
    }
    return 0
}