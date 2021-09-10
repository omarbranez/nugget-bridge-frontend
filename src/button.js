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

    renderButton(buttonX, buttonY, textX, textY, percent = 1){
        const name = new Image()
        name.src = this.src
        name.onload = () => {
            // debugger
            this.context.drawImage(name, buttonX, buttonY, this.width * percent, this.height * percent)
        }
        battlePokemonContext.fillStyle = "white"
        if (percent === 0.75){
            battlePokemonContext.font = "1.5em sans-serif"
        }
        battlePokemonContext.fillText(this.text, textX, textY)
    }

    // renderPokemonButtons()
    
}