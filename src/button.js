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
        // debugger
        await Button.drawButton(button)
        battleTextContext.fillStyle = "white"
        if (button.percent === 0.75){
            battleTextContext.font = "1em sans-serif"
        }
        battleTextContext.fillText(button.text, button.textX, button.textY)
    }    

    static find(button){
        // debugger
        return Button.all.find( b => b.name === button)
    }

    static async renderButton(button){
        // debugger
        await Button.drawButtonText(button)
    }

}