class Player {
    static all = []
    constructor(src){
        this.name = src.attributes.name
        this.playerID = src.id
        this.victories = src.attributes.victories
        this.team = []
        this.currentPokemon// = this.team[0] || ""
        // this.teamSize = src.teamSize
        this.constructor.all.push(this)
    }

    updatePositions(){
        for (const pokemon of this.team){
            fetch(`${teamsURL}/${pokemon.teamPokemonID}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    position: this.team.indexOf(pokemon) + 1
                })
            })
        }   
    }

    static clear(){
        Player.all = []
    }
}   