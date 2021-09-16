class Message {
    static all = []
    
    constructor(text, purpose){
        this.text = text
        this.purpose = purpose
        this.constructor.all.push(this) 
    }
    
    static clear(){
        this.all = []
    }

}