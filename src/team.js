console.log(`i'm in the team window`)

let teamWindowSlots = []
let x = 0

let funcArray = [ drawNormal, drawHigher ]
let funcIndex = 0

let hopper
function hopHandler(e){
    let mouseX = e.clientX - teamHighlightCanvas.offsetParent.offsetLeft
    let mouseY = e.clientY - teamHighlightCanvas.offsetParent.offsetTop
    // console.log(mouseX, mouseY)
    if (mouseX > 45 && mouseX < 115 && mouseY > 30 && mouseY < 100){
        // debugger
        hopper = player.team[0]
    } else if (mouseX > 45 && mouseX < 115 && mouseY > 130 && mouseY < 200 && !!player.team[1]){
        hopper = player.team[1]
    } else if (mouseX > 45 && mouseX < 115 && mouseY > 230 && mouseY < 330 && !!player.team[2]){
        hopper = player.team[2]
    } else if (mouseX > 345 && mouseX < 415 && mouseY > 30 && mouseY < 100 && !!player.team[3]){
        hopper = player.team[3]
    } else if (mouseX > 345 && mouseX < 415 && mouseY > 130 && mouseY < 200 && !!player.team[4]){
        hopper = player.team[4]
    } else if (mouseX > 345 && mouseX < 415 && mouseY > 230 && mouseY < 300 && !!player.team[5]){
        hopper = player.team[5]
    } else {
        hopper = '' 
    }
}
window.setInterval(function(){
    if (hopper) {
        funcArray[funcIndex++ % funcArray.length]()
        // console.log("hello")
    }}, 96)

function drawNormal(){
    // debugger
    teamPokemonPicturesContext.clearRect(hopper.xMiniPic, hopper.yMiniPic, 133, 140)
    let pokemonPic = new Image()
    pokemonPic.src = `./assets/pokemon/mini/${hopper.pokemonID}.png`
    teamPokemonPicturesContext.drawImage(pokemonPic, hopper.xMiniPic, hopper.yMiniPic, 133, 100)
    console.log("Jumping Up!")
}
function drawHigher(){
    teamPokemonPicturesContext.clearRect(hopper.xMiniPic, hopper.yMiniPic, 133, 140)
    let pokemonPic = new Image()
    pokemonPic.src = `./assets/pokemon/mini/${hopper.pokemonID}.png`
    teamPokemonPicturesContext.drawImage(pokemonPic, hopper.xMiniPic, hopper.yMiniPic + 5, 133, 100)
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