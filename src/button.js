class Button {
    constructor(src) {
        this.img = new Image()
        this.img.src = src
        this.canvas = gameButtonCanvas
        this.context = gameButtonContext
        Button.all.push(this)
    }


}
Button.all = []