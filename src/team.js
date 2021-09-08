console.log(`i'm in the team window`)
// teamPokemonTextContext.font = "1.2em sans-serif";

// let playerTeam = ["Charizard", "Venusaur"] //already declared in environment for now
let teamWindowSlots = []
let x = 0
// let playerTeam = ["Blastoise", "Dragonite", "Mewtwo", "Zapdos"]
// let playerTeam = []

let funcArray = [ drawNormal, drawHigher ]
let funcIndex = 0

let hopOn = false


window.setInterval(function(){
    if (hopOn) {
        funcArray[funcIndex++ % funcArray.length]()
        // console.log("hello")
    }}, 96)

// function hopper() {
//     funcArray[funcIndex++ % funcArray.length]()
//     if (hopOn) {
//         requestAnimationFrame(hopper)
//     }
// }
// requestAnimationFrame(hopper)
function drawNormal(){
    teamPokemonPicturesContext.clearRect(50, 10, 133, 140)
    let pokemonOnePic = new Image()
    pokemonOnePic.src = `./assets/pokemon-battle/${playerTeam[0].toLowerCase()}-mini.png`
    renderFirstTeam(pokemonOnePic, 50, 50, 133, 100)
    console.log("Jumping Up!")
}
function drawHigher(){
    teamPokemonPicturesContext.clearRect(50, 10, 133, 140)
    let pokemonOnePic = new Image()
    pokemonOnePic.src = `./assets/pokemon-battle/${playerTeam[0].toLowerCase()}-mini.png`
    renderFirstTeam(pokemonOnePic, 50, 45, 133, 100)
    console.log("Jumping Down!")
}

async function renderPlayerTeam(){
    await renderPlayerPokemon()
    teamPokemonPicturesContext.clearRect(0, 0, 888, 512)
    for (const pokemon of playerTeam) {
        console.log(`I'm going to render ${pokemon.name} in the bottom window!`)
    }
    let pokemonOnePic = new Image()
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
    
function renderFirstTeam(pokemon, xLocation, yLocation, width, height){ // add argument of context so this can be refactored with renderButton
        // let 
    pokemon.onload = function() {
        teamPokemonPicturesContext.drawImage(pokemon, xLocation, yLocation, width, height)
    }
    // console.log(`I'm going to draw a mini-pokemon in the lower window`)
}

// function renderTeamWindowText(){
//     teamPokemonTextContext.font = "1.2em sans-serif";
//     console.log(`I'm going to label ${playerTeam[0]}`)
//     teamPokemonTextContext.fillText(`${playerTeam[0]}`, 200, 75)
//     // teamPokemonTextContext.fillText("HP: 341/341", 200, 100) // WORKS just need to pass in object values currentHP / maxHP
//     // teamPokemonTextContext.fillText("Status: OK", 200, 125) // WORKS just need to pass in object value

// }