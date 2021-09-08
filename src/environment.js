// let inOverworld
//      render bridge, player character, and trainers
//
// 
// const battlePokemonCanvas = document.getElementById("battle-pokemon")
// const battlePokemonContext = battlePokemonCanvas.getContext("2d")

// = ["Blastoise", "Dragonite", "Mewtwo", "Zapdos"]
// let cpuTeam
let currentPokemon

function renderPlayerPokemon(){
    // setPlayerTeam()
    currentPokemon = playerTeam[0]
    console.log(`My current Pokemon is ${currentPokemon.name}`)
    const currentPokemonRear = new Image()
    currentPokemonRear.src = `./assets/pokemon-battle/${currentPokemon.name.toLowerCase()}-rear.png`
    console.log(`Draw ${currentPokemonRear.src}`)
    drawBattlePokemon(currentPokemonRear, 150, 140, 200, 200)
    console.log(`Look at my ${currentPokemon.name}!`)
    battlePokemonContext.fillText(currentPokemon.name, 500, 250)
}

function renderCPUPokemon(){
    currentPokemon = cpuTeam[0]
    console.log(`The CPU's current Pokemon is ${currentPokemon.name}`)
    const currentPokemonFront = new Image()
    currentPokemonFront.src = `./assets/pokemon-battle/${currentPokemon.name.toLowerCase()}-front.png`
    console.log(`Draw ${currentPokemonFront.src}`)
    drawBattlePokemon(currentPokemonFront, 550, 20, 200, 200)
    console.log(`Look at their ${currentPokemon.name}!`)
    battlePokemonContext.fillText(currentPokemon.name, 175, 50)
}

function drawBattlePokemon(pokemon, xLocation, yLocation, width, height){
    pokemon.onload = function() {
        battlePokemonContext.drawImage(pokemon, xLocation, yLocation, width, height)
    }
} // this can probably just be a draw all objects thing

function setCPUTeam(){
    return fetch(`${usersURL}/2`)
    .then(res => res.json())
    .then(json => {
        for (const pokemon of json.data.attributes.myTeam){
            cpuTeam.push(pokemon)
            debugger
        }
    })
}