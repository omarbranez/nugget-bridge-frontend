class StaticObject {
    // static all = []
    constructor(name, src, xCoordinate, yCoordinate, width, height) {
        this.name = name
        this.name.src = src
        // this.canvas = gameButtonCanvas
        // this.context = gameButtonContext
        this.xCoordinate = xCoordinate
        this.yCoordinate = yCoordinate
        this.width = width
        this.height = height
        // this.constructor.all.push(this)
    }

    renderGraphic(){
        this.context.drawImage(this.name, this.xCoordinate, this.yCoordinate, this.width, this.height)
    }
    
    // create a button and save for later. 
    // clear old buttons and create new buttons when current pokemon changes
    // or just persist them by associating them with a pokemon id?
}