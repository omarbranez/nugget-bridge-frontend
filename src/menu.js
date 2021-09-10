// let newMenu
//      render form to enter name
//
// let newMenuValid
//      check if form has value for name
//      if true
//          generate password for user
//          post both name and password to db
//          set screen state to "environment" (or maybe welcome?)
//      else
//          reset form
//          display error message
//
// let loginMenu
//      render form to enter password
//
// let loginMenuValid
//      check if password is valid in db
//      if true
//          set screen state to "environment" (or maybe welcome?)
//
//  let teamMenu
//      render names and hp of pokemon in team
//  
//  let overlayMenu
//      render options such as exit
//
// 

function renderInitialMenu(){
    const newGameButton = new Image()
    newGameButton.src = "./assets/menu-button-new-game.png"
    const continueButton = new Image()
    continueButton.src = "./assets/menu-button-continue.png"
    renderButton(newGameButton, 375, 150, 200, 100) // fixed aspect ratio
    renderButton(continueButton, 375, 250, 200, 100)
    drawSelection()
    testSelection()
    console.log("new game menu rendering")
}

function menuButtonListener(e){
    let mouseX = e.x - gameButtonCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - gameButtonCanvas.offsetParent.offsetTop
    console.log(mouseX, mouseY) //alerts if inside gameButtonCanvas
    // DEAR LORD THIS NEEDS TO BECOME A SWITCH // YAY WE DID IT
    switch (menuState) {
        case "main":
            switch(true) {
                case (mouseX >= 380 && mouseX <= 570 && mouseY >= 270 && mouseY <= 330 && menuState === "main"):
                    alert("clicked continueButton")
                    break
                case (mouseX >= 380 && mouseX <= 570 && mouseY >= 170 && mouseY <= 230 && menuState === "main"):
                    alert("clicked newGameButton")
                    break
            }
        case "battle":
            switch(true) {
                case (mouseX > 155 && mouseX < 345 && mouseY >= 445 && mouseY <= 505 && menuState === "battle"):
                    // menuState = "move"
                    changeStateToMove()
                    break
                
                case (mouseX > 355 && mouseX < 555 && mouseY >= 445 && mouseY <= 505 && menuState === "battle"):
                    // menuState = "switch"
                    changeStateToSwitch()
                    break
                
                case (mouseX > 555 && mouseX < 745 && mouseY >= 445 && mouseY <= 505 && menuState === "battle"):
                    alert("clicked quitButton")
                    break
            }
        case "move":
            switch(true) {
                case (mouseX >= 155 && mouseX <= 375 && mouseY >= 345 && mouseY <= 410 && menuState === "move"):
                    alert("clicked reflect")
                    break
                case (mouseX >= 155 && mouseX <= 375 && mouseY >= 445 && mouseY <= 510 && menuState === "move"):
                    alert("clicked take down")
                    break
                case (mouseX >= 555 && mouseX <= 775 && mouseY >= 345 && mouseY <= 410 && menuState === "move"):
                    alert("clicked return")
                    break
                case (mouseX >= 555 && mouseX <= 775 && mouseY >= 445 && mouseY <= 510 && menuState === "move"):
                    alert("clicked u-turn")
                    break
            }
        case "switch":
            switch(true) {
                case (mouseX >= 355 && mouseX <= 500 && mouseY >= 325 && mouseY <= 375 && menuState === "switch"):
                    // debugger
                    alert("clicked moltres")
                    break
                case (mouseX >= 355 && mouseX <= 500 && mouseY >= 385 && mouseY <= 435 && menuState === "switch"):
                    alert("clicked weepinbell")
                    break
                case (mouseX >= 355 && mouseX <= 500 && mouseY >= 445 && mouseY <= 495 && menuState === "switch"):
                    alert("clicked jynx")
                    break
                case (mouseX >= 555 && mouseX <= 700 && mouseY >= 325 && mouseY <= 375 && menuState === "switch"):
                    alert("clicked snorlax")
                    break
                case (mouseX >= 555 && mouseX <= 700 && mouseY >= 385 && mouseY <= 435 && menuState === "switch"):
                    alert("clicked rattata")
                    break
                case (mouseX >= 555 && mouseX <= 700 && mouseY >= 445 && mouseY <= 495 && menuState === "switch"):
                    alert("clicked rhydon")
                    break
                case (mouseX >= 103 && mouseX <= 303 && mouseY >= 420 && mouseY <= 485 && menuState === "switch"):
                    alert("clicked go back")
                    break            
                
            }
    }
}

     
            
function highlightButtonListener(e) {
    // console.log("loaded")
    let mouseX = e.x - highlightCanvas.offsetParent.offsetLeft // minus the bounding areas
    let mouseY = e.y - highlightCanvas.offsetParent.offsetTop
    if (menuState === "battle") {
        if (mouseX > 155  && mouseX < 345  && mouseY >= 445   && mouseY <= 505 ){
            highlightContext.clearRect(0, 0, 888, 512)
            drawSelection(155, 445, 190, 60)
            // alert("highlighting fight button!")
        } else {
            if (mouseX > 355 && mouseX < 555 && mouseY >= 445 && mouseY <= 505 ) {
                highlightContext.clearRect(0, 0, 888, 512)
                drawSelection(355, 445, 190, 60)
                // alert("highlighting switch button")
            } else {
                if (mouseX > 555 && mouseX < 745 && mouseY >= 445 && mouseY <= 505 ) {
                    highlightContext.clearRect(0, 0, 888, 512)
                    drawSelection(555, 445, 190, 60)
                    // alert("highlighting quit button")
                } else {
                    highlightContext.clearRect(0, 0, 888, 512)
        }}}
        } else {
            if (menuState === "move") {
                if (mouseX >= 155 && mouseX <= 345 && mouseY >= 345 && mouseY <= 415){
                    highlightContext.clearRect(0, 0, 888, 512)
                    drawSelection(155,345,190,60)
                } else {
                    if (mouseX >= 155 && mouseX <= 345 && mouseY >= 445 && mouseY <= 515) {
                        highlightContext.clearRect(0,0,888,512)
                        drawSelection(155,445,190,60)
                } else {
                    if (mouseX >= 555 && mouseX <= 745 && mouseY >= 345 && mouseY <=415) {
                        highlightContext.clearRect(0,0,888,512)
                        drawSelection(555,345,190,60)
                } else {
                    if (mouseX >= 555 && mouseX <= 745 && mouseY >= 445 && mouseY <= 515 ){
                        highlightContext.clearRect(0,0,888,512)
                        drawSelection(555,445,190,60)
                } else {
                    highlightContext.clearRect(0, 0, 888, 512)
            }}}}
        } else {
            if (menuState === "switch") {
                if (mouseX >= 350 && mouseX <= 500 && mouseY >= 335 && mouseY <= 385){
                    highlightContext.clearRect(0,0,888,512)
                    drawSelection(350,330,150,55)
                } else {
                    if (mouseX >= 350 && mouseX <= 500 && mouseY >= 395 && mouseY <= 445){
                        highlightContext.clearRect(0,0,888,512)
                        drawSelection(350,390,150,55)
                    } else {
                        if (mouseX >= 350 && mouseX <= 500 && mouseY >= 445 && mouseY <= 505){
                            highlightContext.clearRect(0,0,888,512)
                            drawSelection(350,450,150,55)
                        } else {
                            if (mouseX >= 555 && mouseX <= 700 && mouseY >= 335 && mouseY <= 385){
                                highlightContext.clearRect(0,0,888,512)
                                drawSelection(550,330,150,55)
                            } else {
                                if (mouseX >= 555 && mouseX <= 700 && mouseY >= 395 && mouseY <= 445){
                                    highlightContext.clearRect(0,0,888,512)
                                    drawSelection(550,390,150,55)
                                } else {
                                    if (mouseX >= 555 && mouseX <= 700 && mouseY >= 445 && mouseY <= 505){
                                        highlightContext.clearRect(0,0,888,512)
                                        drawSelection(550,450,150,55)
                                    } else {
                                        if (mouseX >= 100 && mouseX <= 300 && mouseY >= 420 && mouseY <= 480){
                                            highlightContext.clearRect(0,0,888,512)
                                            drawSelection(100,415,200,70)
                                        } else {
                                            highlightContext.clearRect(0,0,888,512)
}}}}}}}}}}}

function replaceBattleOptionsWithMoves(){
    highlightContext.clearRect(0, 0, 888, 512)
    gameButtonContext.clearRect(0, 0, 888, 512)
    Button.all[0].renderButton(150, 325, 195, 385) // we will change the text size depending on the length of the move name string
    Button.all[1].renderButton(150, 425, 195, 485)
    Button.all[2].renderButton(550, 325, 595, 385)
    Button.all[3].renderButton(550, 425, 595, 485)
}

function replaceBattleOptionsWithPokemon(){
    highlightContext.clearRect(0, 0, 888, 512)
    gameButtonContext.clearRect(0,0,888,512)
    battlePokemonContext.font = "1.25em sans-serif"
    battlePokemonContext.fillStyle = "white"
    battlePokemonContext.fillText("Please select a Pokemon", 100, 375)
    battlePokemonContext.fillText("to switch-in", 100, 400)
    Button.all[4].renderButton(350,320,385,365,0.75) // 6 letter Moltres
    Button.all[5].renderButton(350,380,365,425,0.75) // 10 letter Weepinbell
    Button.all[6].renderButton(350,440,400,485,0.75) // 4 letter Jynx
    Button.all[7].renderButton(550,320,585,365,0.75) // 6 letter Snorlax
    Button.all[8].renderButton(550,380,585,425,0.75) // 7 letter Rattata
    Button.all[9].renderButton(550,440,585,485,0.75) // 6 letter Rhydon
    renderStaticButton()
}

async function changeStateToSwitch(){
    await replaceBattleOptionsWithPokemon()
    menuState = "switch"
}

async function changeStateToMove(){
    await replaceBattleOptionsWithMoves()
    menuState = "move"
}
     //continuebutton is 400, 270, 150, 60 
     // continueButton 
     // X > 400, X < 550
     // Y > 270, Y < 330
     // new button is 380, 170, 190, 60)
     // X > 400, X < 550
     // Y > 170, Y < 230
     //fight 155, 320, 190, 60

     // NON CLASS RENDERBUTTON //
function renderButton(gameButton, xLocation, yLocation, width, height){
    gameButton.onload = function() {
        gameButtonContext.drawImage(gameButton, xLocation, yLocation, width, height)
    }
}

// function clearSelection(x, y, dx, dy){
//     highlightContext.clearRect(x, y, dx, dy)
// }

// function testSelection(){ // see how big the clickable area is, for eventlisteners
//     gameButtonContext.beginPath()
//     gameButtonContext.lineWidth = "5"
//     gameButtonContext.strokeStyle = "blue"
//     gameButtonContext.rect(380, 270, 190, 60) //old clickable area for newgamebutton is 400, 170, 150, 60
//     //continuebutton is 400, 270, 150, 60 AKA add 100 to Y location
//     gameButtonContext.stroke()
//     console.log("drew blue rectangle over clickable area")
// }
function renderStaticButton(){ // arguments for the others
    const goBack = new Image()
    goBack.src = "./assets/button-go-back.png"
    renderButton(goBack, 100, 400, 200, 100)
}
function renderBattleButtons(){
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
    drawSelection()
    console.log("displaying battle buttons")
}

// switch (menuState) {
//     case "main":
//         switch(true) {
//             case (mouseX >= 380 && mouseX <= 570 && mouseY >= 270 && mouseY <= 330):
//                 alert("clicked continueButton")
//                 break
//             case (mouseX >= 380 && mouseX <= 570 && mouseY >= 170 && mouseY <= 230):
//                 alert("clicked newGameButton")
//                 break
//         }
//     case "battle":
//         switch(true) {
//             case (mouseX > 155 && mouseX < 345 && mouseY >= 445 && mouseY <= 505):
//                 replaceBattleOptionsWithMoves()
//                 break
//             case (mouseX > 355 && mouseX < 555 && mouseY >= 445 && mouseY <= 505):
//                 replaceBattleOptionsWithPokemon()
//                 break
//             case (mouseX > 555 && mouseX < 745 && mouseY >= 445 && mouseY <= 505):
//                 alert("clicked quitButton")
//                 break
//         }
//     case "move":
//         switch(true) {
//             case (mouseX >= 155 && mouseX <= 375 && mouseY >= 345 && mouseY <= 410):
//                 alert("clicked reflect")
//                 break
//             case (mouseX >= 155 && mouseX <= 375 && mouseY >= 445 && mouseY <= 510):
//                 alert("clicked take down")
//                 break
//             case (mouseX >= 555 && mouseX <= 775 && mouseY >= 345 && mouseY <= 410):
//                 alert("clicked return")
//                 break
//             case (mouseX >= 555 && mouseX <= 775 && mouseY >= 445 && mouseY <= 510):
//                 alert("clicked u-turn")
//                 break
//         }
//     case "switch":
//         switch(true) {
//             case (mouseX >= 355 && mouseX <= 500 && mouseY >= 325 && mouseY <= 375):
//                 alert("clicked moltres")
//                 break
//             case (mouseX >= 355 && mouseX <= 500 && mouseY >= 385 && mouseY <= 435):
//                 alert("clicked weepinbell")
//                 break
//             case (mouseX >= 355 && mouseX <= 500 && mouseY >= 445 && mouseY <= 495):
//                 alert("clicked jynx")
//                 break
//             case (mouseX >= 555 && mouseX <= 700 && mouseY >= 325 && mouseY <= 375):
//                 alert("clicked snorlax")
//                 break
//             case (mouseX >= 555 && mouseX <= 700 && mouseY >= 385 && mouseY <= 435):
//                 alert("clicked rattata")
//                 break
//             case (mouseX >= 555 && mouseX <= 700 && mouseY >= 445 && mouseY <= 495):
//                 alert("clicked rhydon")
//                 break
//             case (mouseX >= 103 && mouseX <= 303 && mouseY >= 420 && mouseY <= 485):
//                 alert("clicked go back")
//                 break                
//         }
// }