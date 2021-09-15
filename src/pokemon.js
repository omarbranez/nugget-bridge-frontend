class Pokemon {
    static all = []
    constructor(src) {
        this.teamPokemonID = src.id
        this.userID = src.attributes.userId
        // this.pokemonID = src.attributes.id
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
    
    


    
    
}
