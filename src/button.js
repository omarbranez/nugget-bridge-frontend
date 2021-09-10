class Button {
    static all = []
    constructor(name, src, width, height, text, purpose) {
        this.name = name
        this.src = src
        // this.xCoordinate
        // this.yCoordinate
        this.width = width
        this.height = height
        this.text = text
        this.purpose = purpose
        this.canvas = document.getElementById("battle-buttons")
        this.context = document.getElementById("battle-buttons").getContext("2d")
        // this.textContext = gameTe
        this.constructor.all.push(this)
    }

    renderMoveButton(buttonX, buttonY, textX, textY){
        const name = new Image()
        name.src = this.src
        name.onload = () => {
            this.context.drawImage(name, buttonX, buttonY, this.width, this.height)
        }
        battlePokemonContext.fillStyle = "white"
        battlePokemonContext.fillText(this.text, textX, textY)
    }

    replaceBattleOptionsWithMoves(){
        gameButtonContext.clearRect(0, 0, 888, 512)
        menuState = "move"
        Button.all[0].renderMoveButton(150, 325, 195, 385) // we will change the text size depending on the length of the move name string
        Button.all[1].renderMoveButton(150, 425, 195, 485)
        Button.all[2].renderMoveButton(550, 325, 595, 385)
        Button.all[3].renderMoveButton(550, 425, 595, 485)
    }
    
}