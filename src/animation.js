const hpBarCanvas = document.getElementById("hp-bar")
const hpBarContext = hpBarCanvas.getContext("2d")

const playerPokemonCurrentHP = 133
const playerPokemonMaxHP = 300
const cpuPokemonCurrentHP = 200
const cpuPokemonMaxHP = 290



function drawHpBar(){
    const hpBar = new Image() // for each player
    const cpuHPBar = new Image()
    hpBar.src = "./assets/progress-bar-blank-transparent.png"
    cpuHPBar.src = "./assets/progress-bar-blank-transparent.png"
    hpBar.onload = function() {
        hpBarContext.drawImage(hpBar, 495, 260, 275, 50)
        hpBarContext.fillStyle = "green";
        if (playerPokemonCurrentHP === playerPokemonMaxHP) {
            hpBarContext.fillRect(565, 275, 190, 14) // full hp
        } else {
            hpBarContext.fillRect(565, 275, (playerPokemonCurrentHP/playerPokemonMaxHP) * 190, 14)
        }
    }
    cpuHPBar.onload = function() {
        hpBarContext.drawImage(hpBar, 175, 60, 275, 50)
        hpBarContext.fillStyle = "green";
        if (cpuPokemonCurrentHP === cpuPokemonMaxHP) {
            hpBarContext.fillRect(245, 75, 190, 14) // full hp
        } else {
            hpBarContext.fillRect(245, 75, (cpuPokemonCurrentHP/cpuPokemonMaxHP) * 190, 14)
        }
    }
}