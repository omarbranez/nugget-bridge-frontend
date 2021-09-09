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
        this.canvas = gameButtonCanvas
        this.context = gameButtonContext
        this.constructor.all.push(this)
    }

    renderMoveButton(xCoordinate, yCoordinate){
        const name = new Image()
        name.src = this.src
        name.onload = () => {
            // debugger
            this.context.drawImage(name, xCoordinate, yCoordinate, this.width, this.height)
    }}
    
}