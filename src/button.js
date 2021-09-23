class Button {
    static all = []
    constructor(name, src, width, height, text, purpose, context=battleButtonContext) {
        this.name = name
        this.src = src
        this.width = width
        this.height = height
        this.text = text
        this.purpose = purpose
        this.context = context
        this.constructor.all.push(this)
    }

    static drawButton(button){
        const name = new Image()
        name.src = button.src
        name.onload = () => {
            battleButtonContext.drawImage(name, button.xStart, button.yStart, button.width * button.percent, button.height * button.percent)
        }    
    }

    static async drawButtonText(button){
        await Button.drawButton(button)
        battleTextContext.fillStyle = "white"
        if (button.percent === 0.75){
            battleTextContext.font = "1em sans-serif"
        }
        battleTextContext.fillText(button.text, button.textX, button.textY)
    }    

    static find(button){
        return Button.all.find( b => b.name === button)
    }

    static async renderButton(button){
        await Button.drawButtonText(button)
    }

    static renderGameButton(gameButton, xLocation, yLocation, width, height) {
        gameButton.onload = function() {
            gameButtonContext.drawImage(gameButton, xLocation, yLocation, width, height)
        }
    }

    static createMoveButtons(){ 
        Button.all = []
        for (const move of [player.currentPokemon.move1, player.currentPokemon.move2, player.currentPokemon.move3, player.currentPokemon.move4]){
            new Button(move.name, "./assets/button-blank.png", 133, 66, move.name, "move-select")
        }
        Object.assign(Button.find(player.currentPokemon.move1.name), {
            xStart: 233,
            yStart: 217,
            textX: 263,
            textY: 257,
            percent: 1
        })
        Object.assign(Button.find(player.currentPokemon.move2.name), {
            xStart: 233,
            yStart: 283,
            textX: 263,
            textY: 323,
            percent: 1
        })
        Object.assign(Button.find(player.currentPokemon.move3.name), {
            xStart: 367,
            yStart: 217,
            textX: 397,
            textY: 257,
            percent: 1
        })
        Object.assign(Button.find(player.currentPokemon.move4.name), {
            xStart: 367,
            yStart: 283,
            textX: 397,
            textY: 323,
            percent: 1
        })
    }

    static createPokemonButtons() { // 
        for (const pokemon of Pokemon.all){
            if (String(pokemon.userID) === playerID){
                new Button(pokemon.name, "./assets/button-blank.png", 133, 66, pokemon.name, "pokemon-select")
            }
        }
        if (!!player.team[0]){   
            Object.assign(Button.find(player.team[0].name), { // position vs player team
                xStart: 233,
                yStart: 213,
                textX: 257, // 6 letter Moltres // position 1 // we can probably assign the different textX with a loop
                textY: 243,
                percent: 0.75
            })
        }   
        if (!!player.team[1]){
            Object.assign(Button.find(player.team[1].name), { // position vs player team
                xStart: 233,
                yStart: 253,
                textX: 243, // 10 letter Weepinbell // position 2
                textY: 283,
                percent: 0.75
            })
        }
        if (!!player.team[2]){
            Object.assign(Button.find(player.team[2].name), { // position vs player team
                xStart: 233,
                yStart: 293,
                textX: 267, // 4 letter Jynx // position 3
                textY: 323,
                percent: 0.75
            })
        }
        if (!!player.team[3]){
            Object.assign(Button.find(player.team[3].name), { // position vs player team
                xStart: 367,
                yStart: 213,
                textX: 391, // 6 letter Snorlax // position 4
                textY: 243,
                percent: 0.75
            })
        }
        if (!!player.team[4]){
            Object.assign(Button.find(player.team[4].name), { // position vs player team
                xStart: 367,
                yStart: 253,
                textX: 391, // 7 letter Rattata // position 5
                textY: 283,
                percent: 0.75
            })
        }
        if (!!player.team[5]){
            Object.assign(Button.find(player.team[5].name), { // position vs player team
                xStart: 367,
                yStart: 293,
                textX: 391, // 6 letter Rhydon // position 6
                textY: 323,
                percent: 0.75
            })
        }
    }

    static async renderOptionButtons(){ // MOVE THESE TO THE RIGHT
        clearBlueWindow()
        const fightButton = new Image()
        fightButton.src = "./assets/battle-fight-button.png"
        Button.renderGameButton(fightButton, 100, 283, 133, 67)
        const switchButton = new Image()
        switchButton.src = "./assets/battle-switch-button.png"
        Button.renderGameButton(switchButton, 234, 283, 133, 67)
        const quitButton = new Image()
        quitButton.src = "./assets/battle-save-quit-button.png"
        Button.renderGameButton(quitButton, 368, 283, 133, 67)
        textLeftSide("Please select a option")
    }

    static async renderPokemonButtons(){
        clearBlueWindow()
        // Button.all = []
        Button.createPokemonButtons()
        textLeftSide("Please select a Pokemon")
        battleTextContext.fillText("to switch-in", 67, 267)
        for (const button of Button.all){
            if (button.purpose === "pokemon-select"){
                Button.renderButton(button)
            }
        }
        if (!!player.currentPokemon){
        Button.renderGoBackButton()
        }
    }

    static async renderMoveButtons(){
        clearBlueWindow()
        textLeftSide("Please select an attack")
        for (const button of Button.all) {
            if (button.purpose === "move-select"){
                Button.renderButton(button)
            }
        }
        Button.renderGoBackButton()
    }

    static renderGoBackButton(){ // arguments for the others
        const goBack = new Image()
        goBack.src = "./assets/button-go-back.png"
        Button.renderGameButton(goBack, 67, 267, 133, 67)
    }


}