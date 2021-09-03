const hpBarCanvas = document.getElementById("hp-bar")
const hpBarContext = hpBarCanvas.getContext("2d")

// temp stuff
const playerPokemonCurrentHP = 127
const playerPokemonMaxHP = 300
const cpuPokemonCurrentHP = 100
const cpuPokemonMaxHP = 290



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
        // hpBarContext.strokeText(`HP: ${playerPokemonCurrentHP}/${playerPokemonMaxHP}`, 600, 288)
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

}