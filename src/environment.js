// let inOverworld
//      render bridge, player character, and trainers
//
// 
const battlePokemonCanvas = document.getElementById("battle-pokemon")
const battlePokemonContext = battlePokemonCanvas.getContext("2d")

// let playerTeam = ["Blastoise", "Dragonite", "Mewtwo", "Zapdos"]
let cpuTeam = ["Mewtwo", "Venusaur"]

battlePokemonContext.font = "2em sans-serif";

function renderPlayerPokemon(){
    const currentPokemon = playerTeam[0]
    console.log(`My current Pokemon is ${currentPokemon}`)
    const currentPokemonRear = new Image()
    currentPokemonRear.src = `./assets/pokemon-battle/${currentPokemon.toLowerCase()}-rear.png`
    console.log(`Draw ${currentPokemonRear.src}`)
    drawBattlePokemon(currentPokemonRear, 150, 140, 200, 200)
    console.log(`Look at my ${currentPokemon}!`)
    battlePokemonContext.fillText(currentPokemon, 500, 250)
}

function renderCPUPokemon(){
    const currentPokemon = cpuTeam[0]
    console.log(`The CPU's current Pokemon is ${currentPokemon}`)
    const currentPokemonFront = new Image()
    currentPokemonFront.src = `./assets/pokemon-battle/${currentPokemon.toLowerCase()}-front.png`
    console.log(`Draw ${currentPokemonFront.src}`)
    drawBattlePokemon(currentPokemonFront, 550, 20, 200, 200)
    console.log(`Look at their ${currentPokemon}!`)
    battlePokemonContext.fillText(currentPokemon, 175, 50)
}

function drawBattlePokemon(pokemon, xLocation, yLocation, width, height){
    pokemon.onload = function() {
        battlePokemonContext.drawImage(pokemon, xLocation, yLocation, width, height)
    }
} // this can probably just be a draw all objects thing
