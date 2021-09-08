const hpBarCanvas = document.getElementById("hp-bar")
const hpBarContext = hpBarCanvas.getContext("2d")

// temp stuff
let playerPokemonCurrentHP
let playerPokemonMaxHP
const cpuPokemonCurrentHP = 114
const cpuPokemonMaxHP = 416

let displayDialog = "The enemy Mewtwo is Paralyzed! It may not attack!"

const wideChars = ["R", "w", "W", "E"]
const narrowChars = ["", " ", "I", "!"]

function drawHpBar(){
    hpBarContext.font = '1em sans-serif'; 
    hpBarContext.strokeStyle = "black";
    // hpBarContext.fillStyle = "white"; // will need to wrap this inside a function
    const hpBar = new Image() // for each player
    const cpuHPBar = new Image()
    hpBar.src = "./assets/progress-bar-blank-transparent.png"
    cpuHPBar.src = "./assets/progress-bar-blank-transparent.png"
    hpBar.onload = function() { // refactor
        hpBarContext.drawImage(hpBar, 495, 260, 275, 50)
        hpBarContext.fillStyle = "green";
        if (playerPokemonCurrentHP === playerPokemonMaxHP) {
            hpBarContext.fillRect(565, 275, 190, 14) // full hp
        } else {
            hpBarContext.fillRect(565, 275, (playerPokemonCurrentHP/playerPokemonMaxHP) * 190, 14)
        }
        if (playerTeam) {
            hpBarContext.fillStyle = "black"
            hpBarContext.fillText(`HP: ${playerPokemonCurrentHP}/${playerPokemonMaxHP}`, 600, 288)
        }
        console.log(`${playerTeam[0]} has ${playerPokemonCurrentHP} out of ${playerPokemonMaxHP} HP remaining!`)
    }
    cpuHPBar.onload = function() {
        hpBarContext.drawImage(hpBar, 175, 60, 275, 50)
        hpBarContext.fillStyle = "green";
        if (cpuPokemonCurrentHP === cpuPokemonMaxHP) {
            hpBarContext.fillRect(245, 75, 190, 14) // full hp
        } else {
            hpBarContext.fillRect(245, 75, (cpuPokemonCurrentHP/cpuPokemonMaxHP) * 190, 14)
        }
        if (cpuTeam) {
            hpBarContext.fillStyle = "black"
            hpBarContext.fillText(`HP: ${cpuPokemonCurrentHP}/${cpuPokemonMaxHP}`, 280, 88)
        }
        console.log(`${cpuTeam[0]} has ${cpuPokemonCurrentHP} out of ${cpuPokemonMaxHP} HP remaining!`)
    }
    animateText(displayDialog.toUpperCase())
}

function animateText(text){
    const textLength = text.length
    gameButtonContext.font = '2em sans-serif'; 
    gameButtonContext.fillStyle = "white";
    let i = 0
    let letterX = 100
    const writer = setInterval( function() {
        if ( i === textLength) {
            clearInterval(writer)
        } else {
            renderText(text[i], letterX)
            if (narrowChars.includes(text[i]) || narrowChars.includes(text[i+1])){
                letterX = letterX + 15
                // console.log(gameButtonContext.measureText(text[i]))
            } else {
                if (wideChars.includes(text[i])){
                    letterX = letterX + 25
                }
            else {
                letterX = letterX + 20
            }}
            i++
            // console.log(`${letterX}, ${text[i]}`)
        }
    }, 30)
}

function renderText(letter, newX) {
    gameButtonContext.textAlign = "center"
    if (newX <= 788) {
        gameButtonContext.fillText(letter, newX, 360)
    } else {
        gameButtonContext.fillText(letter, newX - 688, 410)
    }
}