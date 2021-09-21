function drawHpBar(){ 
    const hpBar = new Image() // for each player
    const cpuHPBar = new Image()
    hpBar.src = "./assets/progress-bar-blank-transparent.png"
    cpuHPBar.src = "./assets/progress-bar-blank-transparent.png"
    hpBar.onload = function() { // refactor
        hpBarContext.drawImage(hpBar, 330, 173, 183, 33)
        hpBarContext.fillStyle = "green";
        if (player.currentPokemon.currentHP === player.currentPokemon.hpStat) {
            hpBarContext.fillRect(377, 183, 127, 9) // full hp
        } else if (player.currentPokemon.currentHP <= 0){
                hpBarContext.fillRect(377, 183, 0, 9)            
        } else {
            hpBarContext.fillRect(377, 183, (player.currentPokemon.currentHP/player.currentPokemon.hpStat) * 127, 9)
        }
        if (player.team) {
            hpBarContext.fillStyle = "black"
            if (player.currentPokemon.currentHP <= 0){
                hpBarContext.fillText(`HP: 0/${player.currentPokemon.hpStat}`, 400, 191)
            } else {
                hpBarContext.fillText(`HP: ${player.currentPokemon.currentHP}/${player.currentPokemon.hpStat}`, 400, 191)
            }   
        console.log(`${player.currentPokemon.name} has ${player.currentPokemon.currentHP} out of ${player.currentPokemon.hpStat} HP remaining!`)
        }
    }
    cpuHPBar.onload = function() {
        hpBarContext.drawImage(hpBar, 117, 40, 183, 33)
        hpBarContext.fillStyle = "green";
        if (cpu.currentPokemon.currentHP === cpu.currentPokemon.hpStat) {
            hpBarContext.fillRect(163, 50, 127, 9) // full hp
        } else if (cpu.currentPokemon.currentHP <= 0){
            hpBarContext.fillRect(163, 50, 0, 9)            
        } else {
            hpBarContext.fillRect(163, 50, (cpu.currentPokemon.currentHP/cpu.currentPokemon.hpStat) * 127, 9)
        }
        if (cpu.team) {
            hpBarContext.fillStyle = "black"
            if (cpu.currentPokemon.currentHP <= 0){
                hpBarContext.fillText(`HP: 0/${cpu.currentPokemon.hpStat}`, 187, 59)
            } else {
                hpBarContext.fillText(`HP: ${cpu.currentPokemon.currentHP}/${cpu.currentPokemon.hpStat}`, 187, 59)
            }
        console.log(`${cpu.currentPokemon.name} has ${cpu.currentPokemon.currentHP} out of ${cpu.currentPokemon.hpStat} HP remaining!`)
        }
    }
}

function redrawHP(pokemon, xBarStart, yBarStart, textXStart, textYStart){
    let counter = 0
    const drawBar = setInterval(function() {
    if ((counter <= battle.attackDamage) && (((pokemon.currentHP + battle.attackDamage) - counter)/pokemon.hpStat >= 0)){
        hpBarContext.fillStyle = "green";
        hpBarContext.clearRect(xBarStart, yBarStart, 127,10)
        hpBarContext.fillRect(xBarStart, yBarStart, (((pokemon.currentHP+battle.attackDamage)-counter)/pokemon.hpStat) * 127, 9)
        hpBarContext.fillStyle = "black"
        if ((pokemon.currentHP+battle.attackDamage-counter/pokemon.hpStat < 0)){
            clearInterval(drawBar)
        }
        if (pokemon.currentHP+battle.attackDamage-counter <= 0) {
            hpBarContext.fillText(`HP: 0/${pokemon.hpStat}`, textXStart, textYStart)
        } else {
            hpBarContext.fillText(`HP: ${pokemon.currentHP+battle.attackDamage-counter}/${pokemon.hpStat}`, textXStart, textYStart)
        }
    } else {
        clearInterval(drawBar)
    }
    ++counter
    }, 30)
}

function animateText(text){
    clearBlueWindow()
    text = text.toUpperCase()
    const textLength = text.length
    // debugger
    gameButtonCanvas.style.letterSpacing = '.3px'
    gameButtonContext.font = '1.33em monospace'; 
    gameButtonContext.fillStyle = "white";
    gameButtonContext.textAlign = "center"
    let i = 0
    let letterX = 66
    const writer = setInterval( function() {
        if ( i === textLength) {
            clearInterval(writer)
        } else {
            renderText(text[i], letterX)
            letterX = letterX + 9
            i++
        }
    }
    , 30)
}

function renderText(letter, newX) {
    gameButtonContext.textAlign = "center"
    if (newX <= 525) {
        gameButtonContext.fillText(letter, newX, 240)
    } else {
        gameButtonContext.fillText(letter, newX - 459, 273)
    }
}

function animateWithDelay(text, duration){
    setTimeout( ()=> animateText(text), duration)
}

function spritesheetAnimate(numColumns, numRows, sheetWidth, sheetHeight, bgImage) {
    let frameWidth = sheetWidth / numColumns //2220
    let frameHeight = sheetHeight / numRows // 10250
    let currentFrame = 0;
    titleAnimator = setInterval( function() { // animate spritesheet
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
