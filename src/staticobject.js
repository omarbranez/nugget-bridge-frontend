class StaticObject {
    static all = []
    constructor(name, src, xCoordinate, yCoordinate, width, height) {
        this.name = name
        this.name.src = src
        // this.canvas = gameButtonCanvas
        // this.context = gameButtonContext
        this.xCoordinate = xCoordinate
        this.yCoordinate = yCoordinate
        this.width = width
        this.height = height
        this.constructor.all.push(this)
    }

    renderGraphic(){
        this.context.drawImage(this.name, this.xCoordinate, this.yCoordinate, this.width, this.height)
    }
    
    // render
}