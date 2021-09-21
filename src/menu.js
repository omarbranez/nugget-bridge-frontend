function renderInitialMenu(){
    const newGameButton = new Image()
    newGameButton.src = "./assets/menu-button-new-game.png"
    const continueButton = new Image()
    continueButton.src = "./assets/menu-button-continue.png"
    renderButton(newGameButton, 226, 67, 133, 66) // fixed aspect ratio
    renderButton(continueButton, 226, 167, 133, 66)
    drawSelection()
    console.log("new game menu rendering")
}

function menuButtonListener(e){
    let mouseX = e.x - gameButtonCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - gameButtonCanvas.offsetParent.offsetTop
    console.log(mouseX, mouseY)
    switch (menuState) {
        case "initial":
            switch(true) {
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 180 && mouseY <= 220 && menuState === "initial"):
                    // alert("clicked continueButton")
                    renderContinueModal()
                    break
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 80 && mouseY <= 120 && menuState === "initial"):
                    // alert("clicked newGameButton")
                    renderNewUserModal()
                    break
            }
        case "battle-options":
            switch(true) {
                case (mouseX > 103 && mouseX < 233 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options"):
                    changeStateToMove()
                    break
                case (mouseX > 237 && mouseX < 367 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options"):
                    changeStateToSwitch()
                    break
                case (mouseX > 371 && mouseX < 501 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options"):
                    // alert("clicked quitButton")
                    let response = confirm("Would you really like to quit? Your status will be saved")
                    if (response == true){
                        restartGame()
                    }
                    break
            }
        case "move":
            switch(true) {
                case (mouseX >= 237 && mouseX <= 383 && mouseY >= 153 && mouseY <= 273 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move1, player, cpu)
                    // debugger
                    battle.runBattle()
                    break
                case (mouseX >= 237 && mouseX <= 383 && mouseY >= 297 && mouseY <= 340 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move2, player, cpu)
                    battle.runBattle()
                    break
                case (mouseX >= 247 && mouseX <= 517 && mouseY >= 153 && mouseY <= 273 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move3, player, cpu)
                    battle.runBattle()
                    break
                case (mouseX >= 247 && mouseX <= 517 && mouseY >= 297 && mouseY <= 340 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move4, player, cpu)
                    battle.runBattle()
                    break
                case (mouseX >= 103 && mouseX <= 303 && mouseY >= 280 && mouseY <= 323 && menuState === "move"):
                    changeStateToBattleOptions()
                    break     
            }
    }
}

function switchButtonListener(e){
    let mouseX = e.x - gameButtonCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - gameButtonCanvas.offsetParent.offsetTop
    if (menuState == "switch"){
        if (mouseX >= 235 && mouseX <= 333 && mouseY >= 223 && mouseY <= 250){
            if (!player.currentPokemon){
                switchPokemonFromMenu(0)
            } else {
                alert("you cannnot switch with yourself!")
            }
        } else if (mouseX >= 235 && mouseX <= 333 && mouseY >= 257 && mouseY <= 435){
            switchPokemonFromMenu(1)
        } else if (mouseX >= 235 && mouseX <= 333 && mouseY >= 297 && mouseY <= 495){
            switchPokemonFromMenu(2)
        } else if (mouseX >= 369 && mouseX <= 465 && mouseY >= 223 && mouseY <= 256){
            switchPokemonFromMenu(3)
        } else if (mouseX >= 369 && mouseX <= 465 && mouseY >= 257 && mouseY <= 435){
            switchPokemonFromMenu(4)
        } else if (mouseX >= 369 && mouseX <= 465 && mouseY >= 297 && mouseY <= 495){
            switchPokemonFromMenu(5)
        } else if (mouseX >= 69 && mouseX <= 198 && mouseY >= 280 && mouseY <= 323 && !!player.currentPokemon){
            changeStateToBattleOptions() 
        }
    }
}

// }
function highlightButtonListener(e) {
    let mouseX = e.x - highlightCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - highlightCanvas.offsetParent.offsetTop
    switch(menuState) {
        case "initial":
            switch(true){
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 180 && mouseY <= 220 && menuState === "initial"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(228,180,128,40)
                    break
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 80 && mouseY <= 120 && menuState === "initial"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(228,80,128,40)
                    break
                case (menuState === "initial"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
            }
        case "battle-options": 
            switch(true){
                case (mouseX > 103 && mouseX < 233 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options"):
                    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
                    drawSelection(103, 297, 127, 40)
                    break
                // alert("highlighting fight button!")
                case (mouseX > 237 && mouseX < 367 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options" ):
                    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
                    drawSelection(237, 297, 127, 40)
                    // alert("highlighting switch button")
                    break
                case (mouseX > 373 && mouseX < 503 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options" ):
                    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
                    drawSelection(372, 297, 127, 40)
                    // alert("highlighting quit button")
                    break
                case (menuState === "battle-options"):
                    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
            } 
        case "move":
            switch(true){
                case (mouseX >= 237 && mouseX <= 363 && mouseY >= 233 && mouseY <= 273 && menuState === "move"):
                    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
                    drawSelection(237,230,127,40)
                    break
                case (mouseX >= 237 && mouseX <= 363 && mouseY >= 297 && mouseY <= 337 && menuState === "move"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(237,297,127,40)
                    break
                case (mouseX >= 370 && mouseX <= 497 && mouseY >= 233 && mouseY <= 273 && menuState === "move"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(370,230,127,40)
                    break
                case (mouseX >= 370 && mouseX <= 497 && mouseY >= 297 && mouseY <= 337 && menuState === "move"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(370,297,127,40)
                    break
                case (mouseX >= 70 && mouseX <= 197 && mouseY >= 284 && mouseY <= 324 && menuState === "move"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(69,280,127,40)
                        // }
                    break
                case (menuState === "move"):
                    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
            }
        case "switch":
            switch(true){
                case (mouseX >= 233 && mouseX <= 333 && mouseY >= 223 && mouseY <= 257 && menuState === "switch" && !!player.team[0]):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(233,220,100,37)
                    break
                case (mouseX >= 233 && mouseX <= 333 && mouseY >= 263 && mouseY <= 297 && menuState === "switch") && !!player.team[1]:
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(233,260,100,37)
                    break
                case (mouseX >= 233 && mouseX <= 333 && mouseY >= 297 && mouseY <= 337 && menuState === "switch") && !!player.team[2]:
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(233,300,100,37)
                    break
                case (mouseX >= 247 && mouseX <= 467 && mouseY >= 223 && mouseY <= 257 && menuState === "switch" && !!player.team[3]):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(367,220,100,37)
                    break
                case (mouseX >= 247 && mouseX <= 467 && mouseY >= 263 && mouseY <= 297 && menuState === "switch" && !!player.team[4]):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(367,260,100,37)
                    break
                case (mouseX >= 247 && mouseX <= 467 && mouseY >= 297 && mouseY <= 337 && menuState === "switch" && !!player.team[5]):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(367,300,100,37)
                    break
                case ((mouseX >= 70 && mouseX <= 197 && mouseY >= 284 && mouseY <= 324 && menuState === "switch" && !!player.currentPokemon)):
                    // if (!player.team[5]){
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(69,280,127,40)
                    // }
                    break
                case (menuState === "switch"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
            }
    }
}

function replaceBattleOptionsWithMoves(){
    clearBlueWindow()
    textLeftSide("Please select an attack")
    for (const button of Button.all) {
        if (button.purpose === "move-select"){
            debugger
            Button.renderButton(button)
        }
    }
    renderStaticButton()
}

function replaceBattleOptionsWithPokemon(){
    // debugger
    clearBlueWindow()
    // gameButtonCanvas.removeEventListener('click', menuButtonListener, false)
    // Button.all = []
    createPokemonButtons()
    // debugger
    textLeftSide("Please select a Pokemon")
    battleTextContext.fillText("to switch-in", 67, 267)
    for (const button of Button.all){
        if (button.purpose === "pokemon-select"){
            Button.renderButton(button)
        }
    }
    if (!!player.currentPokemon){
    renderStaticButton()
    }
    // menuState = "switch"
    // gameButtonCanvas.addEventListener('click', menuButtonListener, false) 
}

async function changeStateToSwitch(){
    await replaceBattleOptionsWithPokemon()
    menuState = "switch"
}

async function changeStateToMove(){
    await replaceBattleOptionsWithMoves()
    menuState = "move"
}

async function changeStateToBattleOptions(){
    await renderBattleButtons()
    menuState = "battle-options"
}

function textLeftSide(text){
    battleTextContext.font = ".83em sans-serif"
    battleTextContext.fillText(text, 67, 250)
}

function renderButton(gameButton, xLocation, yLocation, width, height){
    gameButton.onload = function() {
        gameButtonContext.drawImage(gameButton, xLocation, yLocation, width, height)
    }
}

function clearBlueWindow(){
    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
    battleButtonContext.clearRect(0,217,battleButtonCanvas.width, battleButtonCanvas.height)
    battleTextContext.clearRect(0,217,battleTextCanvas.width, battleTextCanvas.height)
    gameButtonContext.clearRect(0,217,gameButtonCanvas.width,gameButtonCanvas.height)
}

function renderStaticButton(){ // arguments for the others
    const goBack = new Image()
    goBack.src = "./assets/button-go-back.png"
    renderButton(goBack, 67, 267, 133, 67)
}

function renderBattleButtons(){ // MOVE THESE TO THE RIGHT
    clearBlueWindow()
    const fightButton = new Image()
    fightButton.src = "./assets/battle-fight-button.png"
    // renderButton(fightButton, 100, 300, 133, 67) // moving this down to fit dialog box
    renderButton(fightButton, 100, 283, 133, 67)
    const switchButton = new Image()
    switchButton.src = "./assets/battle-switch-button.png"
    // renderButton(switchButton, 100, 267, 133, 67)
    renderButton(switchButton, 234, 283, 133, 67)
    const quitButton = new Image()
    quitButton.src = "./assets/battle-save-quit-button.png"
    renderButton(quitButton, 368, 283, 133, 67)
    // drawSelection()
    console.log("displaying battle buttons")
}
    // Button.renderButton(Button.find(playerTeam[0].name))
