class Pokemon {
    static all = [] // for testing
    constructor(src) {
        this.teamPokemonID = src.id
        this.userID = src.attributes.userId
        this.pokemonID = src.attributes.pokemonId
        this.position = src.attributes.position //default is array index
        this.name = src.attributes.name
        this.currentHP = src.attributes.currentHp
        this.status = src.attributes.status
        this.type1 = src.attributes.type1
        this.type2 = src.attributes.type2
        this.hpStat = src.attributes.hpStat
        this.attackStat = src.attributes.attackStat
        this.defenseStat = src.attributes.defenseStat
        this.specialAttackStat = src.attributes.specialAttackStat
        this.specialDefenseStat = src.attributes.specialDefenseStat
        this.speedStat = src.attributes.speedStat
        this.move1 = src.attributes.firstMove.data.attributes
        this.move2 = src.attributes.secondMove.data.attributes
        this.move3 = src.attributes.thirdMove.data.attributes
        this.move4 = src.attributes.fourthMove.data.attributes
        this.constructor.all.push(this)
    }

    updatePokemon(){
        // debugger
        fetch(`${teamsURL}/${this.teamPokemonID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                current_hp: this.currentHP,
                current_status: this.status,
                position: this.position
            })
        })
        // .then(res => res.json())
        // .then(messages => console.log(messages));
    }

    async setPosition(){
        this.position = player.team.indexOf(this) + 1
    }

    async assignTeamWindowCoordinates(){ //get set position to work!
        await this.setPosition()
        this.picSrc = `./assets/pokemon/mini/${this.pokemonID}.png`
        if (this.position == 1 || this.position == 2 || this.position == 3){
            this.xMiniPic = 20
            this.xMiniText = 200
        }
        if (this.position == 4 || this.position == 5 || this.position == 6){
            this.xMiniPic = 470
            this.xMiniText = 650
        }
        if (this.position == 1 || this.position == 4){
            this.yMiniPic = 5
            this.yMiniText = 75
        }
        if (this.position == 2 || this.position == 5){
            this.yMiniPic = 155
            this.yMiniText = 225
        }
        if (this.position == 3 || this.position == 6){
            this.yMiniPic = 305
            this.yMiniText = 375
        }
    }
}
