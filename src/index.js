const baseURL = 'http://localhost:3000'
const teamsURL = `${baseURL}/team_pokemons`
const usersURL = `${baseURL}/users`

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

const teamPokemonPicturesCanvas = document.getElementById("team-pokemon-pictures")
const teamPokemonPicturesContext = teamPokemonPicturesCanvas.getContext("2d")

const teamPokemonTextCanvas = document.getElementById("team-pokemon-text")
const teamPokemonTextContext = teamPokemonTextCanvas.getContext("2d")
teamPokemonTextContext.font = "0.8em sans-serif";

const hpBarCanvas = document.getElementById("hp-bar")
const hpBarContext = hpBarCanvas.getContext("2d")
hpBarContext.font = '.66em sans-serif'; 
hpBarContext.strokeStyle = "black";

let playerID
let player 
let cpu 

let currentScreen
let menuState
let spriteVersion = "diamond-pearl"

let ongoingBattle = false   

let battle

let faintedPokemon = []
let titleAnimator
let response
let result
let mourner


function renderPokemon(side){ 
    const pokemonBattleImage = new Image()
    if (side == "player"){
        pokemonBattleImage.src = `./assets/pokemon/${spriteVersion}/back/${player.currentPokemon.pokemonID}.png`
        drawBattlePokemon(pokemonBattleImage, 100, 103, 133, 133)
        battlePokemonContext.fillText(player.currentPokemon.name, 333, 167)
    } else {
        pokemonBattleImage.src = `./assets/pokemon/${spriteVersion}/front/${cpu.currentPokemon.pokemonID}.png`
        drawBattlePokemon(pokemonBattleImage, 367, 13, 133, 133)
        battlePokemonContext.fillText(cpu.currentPokemon.name, 117, 33)
    }
}

async function renderMiniPics(){
    for (const pokemon of player.team){
        await pokemon.assignTeamWindowCoordinates()
        let pokePic = new Image()
        pokePic.src = pokemon.picSrc
        pokePic.onload = function() {
            teamPokemonPicturesContext.drawImage(pokePic, pokemon.xMiniPic, pokemon.yMiniPic, 133, 100)
        }
        teamPokemonTextContext.fillText(pokemon.name, pokemon.xMiniText, pokemon.yMiniText)
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
            Button.renderOptionButtons()
            gameBackgroundContext.fillRect(0, 213, 586, 126)
            ApiService.getPlayer()
            .then(ApiService.getCPU)
            .then(renderPokemon.bind(null, "player"))
            .then(renderPokemon.bind(null, "cpu"))
            .then(renderMiniPics)
            .then(drawHpBar)
            .then(Button.createMoveButtons)
            .then(Button.createPokemonButtons)
            teamPokemonTextCanvas.addEventListener('mousemove', hopHandler)
            break
        case "result":
            gameBackground.src = "./assets/nugget-bridge-result.png"
            break
        default:
            gameBackground.src = "./assets/title-screen-logo.gif"
    }
}

function staticDisplay(bgImage) {
    bgImage.onload = function() {
        gameBackgroundContext.drawImage(bgImage, 0, 0, gameBackgroundCanvas.width, gameBackgroundCanvas.height)
    }
}

function renderModal(purpose){
    const modal = document.getElementById("modal")
    modal.style.display="block"
    let modalContent = document.querySelector(".modal-content")
    let span = document.getElementsByClassName("close")[0]
    span.onclick = function() {
        modal.style.display = "none"
        for (const el of [h3, form, button]){
        el.remove()
    }}
    let h3 = document.createElement("h3")
    let label = document.createElement("label")
    let form = document.createElement("form")
    let input = document.createElement("input")
    let button = document.createElement("input")
    label.htmlFor = "name"
    input.setAttribute("name", "name")
    input.setAttribute("type", "text")
    button.setAttribute("type", "submit")
    modalContent.appendChild(h3)
    modalContent.appendChild(form)
    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(button)
    if (purpose == "new"){
        h3.innerText = "Create Your Profile. Press Enter/Return to Continue!"
        button.innerHTML = "Create a Team!"
        document.querySelector("form").addEventListener("submit", handleNewUser)
    } else {
        if (purpose == "continue") {
            h3.innerText = "Log In To Your Profile. Press Enter/Return to Continue!"
            button.innerHTML = "Load My Team!"
            document.querySelector("form").addEventListener("submit", handleContinue)
        }
    }
}
    
    


function handleNewUser(e) {
    ApiService.createUser(e)
    .then(user => {playerID = user.data.id})
    .then(()=>{
        clearScreen()
        currentScreen = "battle"
        menuState = "battle-options"
        setTimeout(()=>renderGameWindow(), 50)
    })
}

function handleContinue(e){
    ApiService.loadUser(e)
    .then(user => {
        playerID = user.data.id
        alert(`Welcome back, ${user.data.attributes.name}`)
        clearScreen()
        currentScreen = "battle"
        menuState = "battle-options"
        setTimeout(()=>renderGameWindow(), 50)
    })
}

function battleBackgroundDisplay(bgImage) {
    bgImage.onload = function() {
        gameBackgroundContext.drawImage(bgImage, 0, 0, gameBackgroundCanvas.width, 213)
    }
}

function clearScreen() {
    gameBackgroundContext.clearRect(0, 0, gameBackgroundCanvas.width, gameBackgroundCanvas.height)
    gameButtonContext.clearRect(0,0,gameButtonCanvas.width,gameButtonCanvas.height)
    teamPokemonPicturesContext.clearRect(0,0,teamPokemonPicturesCanvas.width, teamPokemonPicturesCanvas.height)
    teamPokemonTextContext.clearRect(0,0,teamPokemonTextCanvas.width,teamPokemonTextCanvas.height)
    battlePokemonContext.clearRect(0,0,battlePokemonCanvas.width,battlePokemonCanvas.height)
    hpBarContext.clearRect(0,0,hpBarCanvas.width,hpBarCanvas.height) 
}

function drawSelection(x, y, dx, dy) {
    highlightContext.beginPath()
    highlightContext.lineWidth = "5"
    highlightContext.strokeStyle = "red"
    highlightContext.rect(x, y, dx, dy)
    highlightContext.stroke()
}

function drawBattlePokemon(pokemon, xLocation, yLocation, width, height){
    pokemon.onload = function() {
        battlePokemonContext.drawImage(pokemon, xLocation, yLocation, width, height)
    }
}

function titleHandler(e){
    e.preventDefault()
    if (e.code == 'Enter' && currentScreen === "title"){
        currentScreen = "initial"
        menuState = "initial"
        removeEventListener('keyup', titleHandler)
        clearInterval(titleAnimator)
        setTimeout(()=>renderGameWindow(), 50)
    }
}

function sortTeam(a, b){
    if (a.position < b.position){
        return -1
    }
    if (a.position > b.position){
        return 1
    }
    return 0
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")
    currentScreen = "title"
    menuState = "title"
    renderGameWindow()
    window.addEventListener('keyup', titleHandler)
    gameButtonCanvas.addEventListener('click', menuButtonHandler)
    gameButtonCanvas.addEventListener('dblclick', switchButtonHandler)
    gameButtonCanvas.addEventListener('mousemove', highlightButtonHandler)
})