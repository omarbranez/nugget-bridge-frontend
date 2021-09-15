const wideChars = ["R", "w", "W", "E"]
const narrowChars = ["", " ", "I", "!"]

async function drawHpBar(){
    await renderCPUPokemon() 
    console.log("i go eigth! rendering the hp bars for both current pokemon!")
    // debugger
    // hpBarContext.fillStyle = "white"; // will need to wrap this inside a function
    const hpBar = new Image() // for each player
    const cpuHPBar = new Image()
    hpBar.src = "./assets/progress-bar-blank-transparent.png"
    cpuHPBar.src = "./assets/progress-bar-blank-transparent.png"
    hpBar.onload = function() { // refactor
        hpBarContext.drawImage(hpBar, 495, 260, 275, 50)
        hpBarContext.fillStyle = "green";
        if (currentPokemon.currentHP === currentPokemon.hpStat) {
            hpBarContext.fillRect(565, 275, 190, 14) // full hp
        } else if (currentPokemon.currentHP <= 0){
                hpBarContext.fillRect(565, 275, 0, 14)            
        } else {
            hpBarContext.fillRect(565, 275, (currentPokemon.currentHP/currentPokemon.hpStat) * 190, 14)
        }
        if (playerTeam) {
            hpBarContext.fillStyle = "black"
            if (currentPokemon.currentHP <= 0){
                hpBarContext.fillText(`HP: 0/${currentPokemon.hpStat}`, 600, 288)
            } else {
                hpBarContext.fillText(`HP: ${currentPokemon.currentHP}/${currentPokemon.hpStat}`, 600, 288)
            }   
        console.log(`${currentPokemon.name} has ${currentPokemon.currentHP} out of ${currentPokemon.hpStat} HP remaining!`)
        }
    }
    cpuHPBar.onload = function() {
        hpBarContext.drawImage(hpBar, 175, 60, 275, 50)
        hpBarContext.fillStyle = "green";
        if (currentCPUPokemon.currentHP === currentCPUPokemon.hpStat) {
            hpBarContext.fillRect(245, 75, 190, 14) // full hp
        } else if (currentCPUPokemon.currentHP <= 0){
            hpBarContext.fillRect(245, 75, 0, 14)            
        } else {
            hpBarContext.fillRect(245, 75, (currentCPUPokemon.currentHP/currentCPUPokemon.hpStat) * 190, 14)
        }
        if (cpuTeam) {
            hpBarContext.fillStyle = "black"
            if (currentPokemon.currentHP <= 0){
                hpBarContext.fillText(`HP: 0/${currentPokemon.hpStat}`, 600, 288)
            } else {
                hpBarContext.fillText(`HP: ${currentCPUPokemon.currentHP}/${currentCPUPokemon.hpStat}`, 280, 88)
            }
        console.log(`${currentCPUPokemon.name} has ${currentCPUPokemon.currentHP} out of ${currentCPUPokemon.hpStat} HP remaining!`)
        }
    }
    // animateText(displayDialog.toUpperCase())
}

function redrawHP(pokemon, xBarStart, yBarStart, textXStart, textYStart){
    hpBarContext.clearRect(xBarStart, yBarStart, 190, 14)
    hpBarContext.fillStyle = "green";
    if (!!(pokemon)) {
        if (pokemon.currentHP <= 0){
            hpBarContext.fillRect(xBarStart, yBarStart, 0, 14)
        } else {
            hpBarContext.fillRect(xBarStart, yBarStart, (pokemon.currentHP/pokemon.hpStat) * 190, 14)
        }
        hpBarContext.fillStyle = "black"
        if (pokemon.currentHP <= 0) {
            hpBarContext.fillText(`HP: 0/${pokemon.hpStat}`, textXStart, textYStart)
        } else {
            hpBarContext.fillText(`HP: ${pokemon.currentHP}/${pokemon.hpStat}`, textXStart, textYStart)
        }
    }
}
function animateHPBar(pokemon, xBarStart, yBarStart, textXStart, textYStart){
    hpBarContext.clearRect(xBarStart, yBarStart, 190, 14)
    hpBarContext.fillStyle = "green";
    if (!!(pokemon)) {
        hpBarContext.fillRect(xBarStart, yBarStart, (pokemon.currentHP/pokemon.hpStat) * 190, 14)
        hpBarContext.fillStyle = "black"
        hpBarContext.fillText(`HP: ${pokemon.currentHP}/${pokemon.hpStat}`, textXStart, textYStart)
    }
}
function animateText(text){
    clearBlueWindow()
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
    // clearBlueWindow()
}

function renderText(letter, newX) {
    gameButtonContext.textAlign = "center"
    if (newX <= 788) {
        gameButtonContext.fillText(letter, newX, 360)
    } else {
        gameButtonContext.fillText(letter, newX - 688, 410)
    }
}

function spritesheetAnimate(numColumns, numRows, sheetWidth, sheetHeight, bgImage) {
    let frameWidth = sheetWidth / numColumns //2220
    let frameHeight = sheetHeight / numRows // 10250
    let currentFrame = 0;
    setInterval( function() { // animate spritesheet
        currentFrame++ // pick new frame
        let maxFrame = numColumns * numRows - 1
        if (currentFrame > maxFrame){ // loop frames
            currentFrame = 0
        }
        let column = currentFrame % numColumns // update rows and columns
        let row = Math.floor(currentFrame / numColumns) // Clear and draw
        gameBackgroundContext.drawImage(bgImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 0, 0, gameBackgroundCanvas.width, gameBackgroundCanvas.height)
    }, 100)    //wait for next step in the loop
}