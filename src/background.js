class Background extends StaticObject {
    static all = []
    constructor(src) {
        super(src)
        this.canvas = gameBackgroundCanvas
        this.context = gameBackgroundContext
    }

    
}