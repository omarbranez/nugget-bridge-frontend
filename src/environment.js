// let inOverworld
//      render bridge, player character, and trainers
//
// 
const battlePokemonCanvas = document.getElementById("battle-pokemon")
const battlePokemonContext = battlePokemonCanvas.getContext("2d")

let playerTeam = ["Blastoise", "Dragonite", "Mewtwo", "Zapdos"]

battlePokemonContext.font = "2em sans-serif";
let cpuTeam = ["Venusaur"]

function renderPlayerPokemon(){
    const currentPokemon = playerTeam[0]
    console.log(`My current Pokemon is ${currentPokemon}`)
    const currentPokemonRear = new Image()
    currentPokemonRear.src = `./assets/pokemon-battle/${currentPokemon.toLowerCase()}-rear.png`
    console.log(`Draw ${currentPokemonRear.src}`)
    drawBattlePokemon(currentPokemonRear, 150, 140, 200, 200)
    console.log(`Look at my ${currentPokemon}!`)
    battlePokemonContext.fillText(currentPokemon, 500, 250)
    // drawHPBar("Player")
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
    // drawHPBar("CPU") 
    // const HPBar = new Image()
    // HPBar.src = "./assets/progress-bar-blank.png"
    // battlePokemonContext.drawImage(HPBar, 175, 125, 100, 100)
    // console.log("drawing HP Bar for CPU Pokemon")
}

function drawBattlePokemon(pokemon, xLocation, yLocation, width, height){
    pokemon.onload = function() {
        battlePokemonContext.drawImage(pokemon, xLocation, yLocation, width, height)
    }
} // this can probably just be a draw all objects thing

// function drawHPBar(player){ // take arguments of current and max HP
//     const hpBarFull = new Image()
//     hpBarFull.src = "./assets/progress-bar-blank.png"
//     const hpBarDepleted = new Image()
//     hpBarDepleted.src = "./assets/progress-bar-fill.png"
//     hpBarFull.onload = function(){
//         if (player === "CPU") {
//             // battlePokemonContext.drawImage(hpBarFull, 175, 60, 275, 50
//             battlePokemonContext.drawImage(hpBarFull, 175, 60, 275, 50)
//             // battlePokemonContext.drawImage(hpBarDepleted, 0, -10, 473, 79, 175, 60, 275, 50 )
//             drawProgress()
//         } else {
//             battlePokemonContext.drawImage(hpBarFull, 500, 260, 275, 50)
//             battlePokemonContext.drawImage(hpBarDepleted, 500, 260, 275, 50 )
//         }
//     }
//     console.log("drawing HP Bar for CPU Pokemon")
// }

function drawProgress() {
 
    var x1 = 244//214, // X position where the progress segment starts
        x2 = 434//546, // X position where the progress segment ends
        s = 80// s = slider.value,
        x3 = 0,
        x4 = 144,
        y1 = 63;
 
    // Calculated x position where the overlayed image should end
 
    x3 = (x1 + ((x2 - x1) / 100) * s);
    console.log(x3)
    // x3 in this case is 434 for full health
 
    // ctx.drawImage(img, 0, iHEIGHT, x3, iHEIGHT, 0, 0, x3, iHEIGHT);
}