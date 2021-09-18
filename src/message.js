class Message {
    static all = []

    constructor(text, purpose){
        this.text = text || ""
        this.constructor.all.push(this)
    }
    
    static clear(){
        for (const message of this.all){
            message.text = ""
        }
    }

}