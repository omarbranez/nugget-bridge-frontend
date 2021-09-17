function renderInitialMenu(){
    const newGameButton = new Image()
    newGameButton.src = "./assets/menu-button-new-game.png"
    const continueButton = new Image()
    continueButton.src = "./assets/menu-button-continue.png"
    renderButton(newGameButton, 375, 150, 200, 100) // fixed aspect ratio
    renderButton(continueButton, 375, 250, 200, 100)
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
                case (mouseX >= 380 && mouseX <= 570 && mouseY >= 270 && mouseY <= 330 && menuState === "initial"):
                    // alert("clicked continueButton")
                    renderContinueModal()
                    break
                case (mouseX >= 380 && mouseX <= 570 && mouseY >= 170 && mouseY <= 230 && menuState === "initial"):
                    // alert("clicked newGameButton")
                    renderNewUserModal()
                    break
            }
        case "battle-options":
            switch(true) {
                case (mouseX > 155 && mouseX < 345 && mouseY >= 445 && mouseY <= 505 && menuState === "battle-options"):
                    changeStateToMove()
                    break
                
                case (mouseX > 355 && mouseX < 555 && mouseY >= 445 && mouseY <= 505 && menuState === "battle-options"):
                    changeStateToSwitch()
                    break
                
                case (mouseX > 555 && mouseX < 745 && mouseY >= 445 && mouseY <= 505 && menuState === "battle-options"):
                    alert("clicked quitButton")
                    break
            }
        case "move":
            switch(true) {
                case (mouseX >= 355 && mouseX <= 575 && mouseY >= 345 && mouseY <= 410 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move1, player, cpu)
                    // debugger
                    battle.runBattle()
                    break
                case (mouseX >= 355 && mouseX <= 575 && mouseY >= 445 && mouseY <= 510 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move2, player, cpu)
                    battle.runBattle()
                    break
                case (mouseX >= 555 && mouseX <= 775 && mouseY >= 345 && mouseY <= 410 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move3, player, cpu)
                    battle.runBattle()
                    break
                case (mouseX >= 555 && mouseX <= 775 && mouseY >= 445 && mouseY <= 510 && menuState === "move"):
                    battle = new Battle(player.currentPokemon.move4, player, cpu)
                    battle.runBattle()
                    break
                case (mouseX >= 103 && mouseX <= 303 && mouseY >= 420 && mouseY <= 485 && menuState === "move"):
                    changeStateToBattleOptions()
                    break     
            }
    }
}

function switchButtonListener(e){
    let mouseX = e.x - gameButtonCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - gameButtonCanvas.offsetParent.offsetTop
    if (menuState == "switch"){
        if (mouseX >= 355 && mouseX <= 500 && mouseY >= 325 && mouseY <= 375){
            if (!player.currentPokemon){
                switchPokemonFromMenu(0)
            } else {
                alert("you cannnot switch with yourself!")
            }
        } else if (mouseX >= 355 && mouseX <= 500 && mouseY >= 385 && mouseY <= 435){
            switchPokemonFromMenu(1)
        } else if (mouseX >= 355 && mouseX <= 500 && mouseY >= 445 && mouseY <= 495){
            switchPokemonFromMenu(2)
        } else if (mouseX >= 555 && mouseX <= 700 && mouseY >= 325 && mouseY <= 375){
            switchPokemonFromMenu(3)
        } else if (mouseX >= 555 && mouseX <= 700 && mouseY >= 385 && mouseY <= 435){
            switchPokemonFromMenu(4)
        } else if (mouseX >= 555 && mouseX <= 700 && mouseY >= 445 && mouseY <= 495){
            switchPokemonFromMenu(5)
        } else if (mouseX >= 103 && mouseX <= 303 && mouseY >= 420 && mouseY <= 485){
            changeStateToBattleOptions() // should get its own listener
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
                case (mouseX >= 380 && mouseX <= 575 && mouseY >= 170 && mouseY <= 235 && menuState === "initial"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(380,170,190,60)
                    break
                case (mouseX >= 380 && mouseX <= 575 && mouseY >= 270 && mouseY <= 335 && menuState === "initial"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(380,270,190,60)
                    break
                case (menuState === "initial"):
                    highlightContext.clearRect(0,0,888,512)
            }
        case "battle-options": 
            switch(true){
                case (mouseX > 155 && mouseX < 345 && mouseY >= 445 && mouseY <= 505 && menuState === "battle-options"):
                    highlightContext.clearRect(0, 0, 888, 512)
                    drawSelection(155, 445, 190, 60)
                    break
                // alert("highlighting fight button!")
                case (mouseX > 355 && mouseX < 555 && mouseY >= 445 && mouseY <= 505 && menuState === "battle-options" ):
                    highlightContext.clearRect(0, 0, 888, 512)
                    drawSelection(355, 445, 190, 60)
                    // alert("highlighting switch button")
                    break
                case (mouseX > 555 && mouseX < 745 && mouseY >= 445 && mouseY <= 505 && menuState === "battle-options" ):
                    highlightContext.clearRect(0, 0, 888, 512)
                    drawSelection(555, 445, 190, 60)
                    // alert("highlighting quit button")
                    break
                case (menuState === "battle-options"):
                    highlightContext.clearRect(0, 0, 888, 512)
            } 
        case "move":
            switch(true){
                case (mouseX >= 355 && mouseX <= 545 && mouseY >= 345 && mouseY <= 415 && menuState === "move"):
                    highlightContext.clearRect(0, 0, 888, 512)
                    drawSelection(355,345,190,60)
                    break
                case (mouseX >= 355 && mouseX <= 545 && mouseY >= 445 && mouseY <= 515 && menuState === "move"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(355,445,190,60)
                    break
                case (mouseX >= 555 && mouseX <= 745 && mouseY >= 345 && mouseY <=415 && menuState === "move"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(555,345,190,60)
                    break
                case (mouseX >= 555 && mouseX <= 745 && mouseY >= 445 && mouseY <= 515 && menuState === "move"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(555,445,190,60)
                    break
                case (menuState === "move"):
                    highlightContext.clearRect(0, 0, 888, 512)
            }
        case "switch":
            switch(true){
                case (mouseX >= 350 && mouseX <= 500 && mouseY >= 335 && mouseY <= 385 && menuState === "switch"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(350,330,150,55)
                    break
                case (mouseX >= 350 && mouseX <= 500 && mouseY >= 395 && mouseY <= 445 && menuState === "switch"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(350,390,150,55)
                    break
                case (mouseX >= 350 && mouseX <= 500 && mouseY >= 445 && mouseY <= 505 && menuState === "switch"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(350,450,150,55)
                    break
                case (mouseX >= 555 && mouseX <= 700 && mouseY >= 335 && mouseY <= 385 && menuState === "switch"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(550,330,150,55)
                    break
                case (mouseX >= 555 && mouseX <= 700 && mouseY >= 395 && mouseY <= 445 && menuState === "switch"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(550,390,150,55)
                    break
                case (mouseX >= 555 && mouseX <= 700 && mouseY >= 445 && mouseY <= 505 && menuState === "switch"):
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(550,450,150,55)
                    break
                case (mouseX >= 100 && mouseX <= 300 && mouseY >= 420 && mouseY <= 480 && menuState === "switch"):
                    if (!player.team[5]){
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(100,415,200,70)
                    }
                    break
                case (menuState === "switch"):
                    highlightContext.clearRect(0,0,888,512)
            }
    }
}

function replaceBattleOptionsWithMoves(){
    clearBlueWindow()
    textLeftSide("Please select an attack")
    for (const button of Button.all) {
        if (button.purpose === "move-select"){
            Button.renderButton(button)
        }
    }
    renderStaticButton()
}

function replaceBattleOptionsWithPokemon(){
    // debugger
    clearBlueWindow()
    // gameButtonCanvas.removeEventListener('click', menuButtonListener, false)
    Button.all = []
    createPokemonButtons()
    // debugger
    textLeftSide("Please select a Pokemon")
    battleTextContext.fillText("to switch-in", 100, 400)
    for (const button of Button.all){
        if (button.purpose === "pokemon-select"){
            Button.renderButton(button)
        }
    }
    renderStaticButton()
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
    battleTextContext.font = "1.25em sans-serif"
    battleTextContext.fillText(text, 100, 375)
}

function renderButton(gameButton, xLocation, yLocation, width, height){
    gameButton.onload = function() {
        gameButtonContext.drawImage(gameButton, xLocation, yLocation, width, height)
    }
}

function clearBlueWindow(){
    highlightContext.clearRect(0, 0, 888, 512)
    battleButtonContext.clearRect(0,325,888,512)
    battleTextContext.clearRect(0,325,888,512)
    gameButtonContext.clearRect(0,325,888,512)
}

function renderStaticButton(){ // arguments for the others
    const goBack = new Image()
    goBack.src = "./assets/button-go-back.png"
    renderButton(goBack, 100, 400, 200, 100)
}

function renderBattleButtons(){ // MOVE THESE TO THE RIGHT
    clearBlueWindow()
    const fightButton = new Image()
    fightButton.src = "./assets/battle-fight-button.png"
    // renderButton(fightButton, 150, 300, 200, 100) // moving this down to fit dialog box
    renderButton(fightButton, 150, 425, 200, 100)
    const switchButton = new Image()
    switchButton.src = "./assets/battle-switch-button.png"
    // renderButton(switchButton, 150, 400, 200, 100)
    renderButton(switchButton, 350, 425, 200, 100)
    const quitButton = new Image()
    quitButton.src = "./assets/battle-save-quit-button.png"
    renderButton(quitButton, 550, 425, 200, 100)
    // drawSelection()
    console.log("displaying battle buttons")
}
    // Button.renderButton(Button.find(playerTeam[0].name))
