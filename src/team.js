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
    pokemonOnePic.src = `./assets/pokemon-battle/${player.team[0].toLowerCase()}-mini.png`
    renderFirstTeam(pokemonOnePic, 50, 50, 133, 100)
    console.log("Jumping Up!")
}
function drawHigher(){
    teamPokemonPicturesContext.clearRect(50, 10, 133, 140)
    let pokemonOnePic = new Image()
    pokemonOnePic.src = `./assets/pokemon-battle/${player.team[0].toLowerCase()}-mini.png`
    renderFirstTeam(pokemonOnePic, 50, 45, 133, 100)
    console.log("Jumping Down!")
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