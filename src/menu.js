function renderInitialMenu(){
    const newGameButton = new Image()
    newGameButton.src = "./assets/menu-button-new-game.png"
    const continueButton = new Image()
    continueButton.src = "./assets/menu-button-continue.png"
    Button.renderGameButton(newGameButton, 226, 67, 133, 66) // fixed aspect ratio
    Button.renderGameButton(continueButton, 226, 167, 133, 66)
    drawSelection()
}

function menuButtonHandler(e){
    let mouseX = e.x - gameButtonCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - gameButtonCanvas.offsetParent.offsetTop
    console.log(mouseX, mouseY)
    switch (menuState) {
        case "initial":
            switch(true) {
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 180 && mouseY <= 220 && menuState === "initial"):
                    renderContinueModal()
                    break
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 80 && mouseY <= 120 && menuState === "initial"):
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
                    let response = confirm("Would you really like to quit? Your status will be saved")
                    if (response == true){
                        restartGame()
                        response = ''
                    }
                    break
            }
        case "move":
            switch(true) {
                case (mouseX >= 237 && mouseX <= 383 && mouseY >= 153 && mouseY <= 273 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move1, player, cpu)
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

function switchButtonHandler(e){
    let mouseX = e.x - gameButtonCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - gameButtonCanvas.offsetParent.offsetTop
    if (menuState == "switch"){
        if (mouseX >= 235 && mouseX <= 333 && mouseY >= 223 && mouseY <= 256){
            if (!player.currentPokemon){
                switchPokemonFromMenu(0)
            } else {
                alert("you cannnot switch with yourself!")
            }
        } else if (mouseX >= 235 && mouseX <= 333 && mouseY >= 257 && mouseY <= 290){
            switchPokemonFromMenu(1)
        } else if (mouseX >= 235 && mouseX <= 333 && mouseY >= 297 && mouseY <= 330){
            switchPokemonFromMenu(2)
        } else if (mouseX >= 369 && mouseX <= 465 && mouseY >= 223 && mouseY <= 256){
            switchPokemonFromMenu(3)
        } else if (mouseX >= 369 && mouseX <= 465 && mouseY >= 257 && mouseY <= 290){
            switchPokemonFromMenu(4)
        } else if (mouseX >= 369 && mouseX <= 465 && mouseY >= 297 && mouseY <= 330){
            switchPokemonFromMenu(5)
        } else if (mouseX >= 69 && mouseX <= 198 && mouseY >= 280 && mouseY <= 323 && !!player.currentPokemon){
            changeStateToBattleOptions() 
        }
    }
}

function highlightButtonHandler(e) {
    let mouseX = e.x - highlightCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - highlightCanvas.offsetParent.offsetTop
    switch(menuState) {
        case "initial":
            switch(true){
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 180 && mouseY <= 220 && menuState === "initial"):
                    // highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(228,180,128,40)
                    break
                case (mouseX >= 226 && mouseX <= 380 && mouseY >= 80 && mouseY <= 120 && menuState === "initial"):
                    // highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(228,80,128,40)
                    break
                case (menuState === "initial"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
            }
        case "battle-options": 
            switch(true){
                case (mouseX > 103 && mouseX < 233 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options"):
                    // highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
                    drawSelection(103, 297, 127, 40)
                    break
                case (mouseX > 237 && mouseX < 367 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options" ):
                    // highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
                    drawSelection(237, 297, 127, 40)
                    break
                case (mouseX > 373 && mouseX < 503 && mouseY >= 297 && mouseY <= 337 && menuState === "battle-options" ):
                    // highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
                    drawSelection(372, 297, 127, 40)
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
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
                    drawSelection(69,280,127,40)
                    break
                case (menuState === "switch"):
                    highlightContext.clearRect(0,0,highlightCanvas.width,highlightCanvas.height)
            }
    }
}

async function changeStateToSwitch(){
    await Button.renderPokemonButtons()
    menuState = "switch"
}

async function changeStateToMove(){
    await Button.renderMoveButtons()
    menuState = "move"
}

async function changeStateToBattleOptions(){
    await Button.renderOptionButtons()
    menuState = "battle-options"
}

function textLeftSide(text){
    battleTextContext.font = ".83em sans-serif"
    battleTextContext.fillText(text, 67, 250)
}

function clearBlueWindow(){
    highlightContext.clearRect(0, 0, highlightCanvas.width,highlightCanvas.height)
    battleButtonContext.clearRect(0,217,battleButtonCanvas.width, battleButtonCanvas.height)
    battleTextContext.clearRect(0,217,battleTextCanvas.width, battleTextCanvas.height)
    gameButtonContext.clearRect(0,217,gameButtonCanvas.width,gameButtonCanvas.height)
}
