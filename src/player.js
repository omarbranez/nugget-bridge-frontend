class Player {
    constructor(src){
        this.name = src.attributes.name
        this.playerID = src.id
        this.victories = src.attributes.victories
        this.team = []
        this.currentPokemon// = this.team[0] || ""
        // this.teamSize = src.teamSize
    }
}