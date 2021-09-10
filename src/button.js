class Button {
    static all = []
    constructor(name, src, width, height, text, purpose, context=battleButtonContext) {
        this.name = name
        this.src = src
        // this.xCoordinate
        // this.yCoordinate
        this.width = width
        this.height = height
        this.text = text
        this.purpose = purpose
        this.context = context
        this.constructor.all.push(this)
    }

    async renderButton(buttonX, buttonY, textX, textY, percent = 1){
        this.drawButtonText(textX, textY, percent,buttonX, buttonY, )
    }

    drawButton(buttonX, buttonY, percent = 1){
        const name = new Image()
        name.src = this.src
        name.onload = () => {
            this.context.drawImage(name, buttonX, buttonY, this.width * percent, this.height * percent)
        }    
    }

    async drawButtonText(textX, textY, percent = 1, buttonX, buttonY){
        await this.drawButton(buttonX, buttonY, percent)
        battleTextContext.fillStyle = "white"
        if (percent === 0.75){
            battleTextContext.font = "1.5em sans-serif"
        }
        battleTextContext.fillText(this.text, textX, textY)
    }    
}