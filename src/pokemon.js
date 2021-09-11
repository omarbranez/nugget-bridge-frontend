class Pokemon {
    static all = []
    constructor(src) {
        this.userID = src.userID
        this.position = src.position
        this.name = src.name
        this.currentHP = src.currentHP
        this.status = src.status
        this.type1 = src.type1
        this.type2 = src.type2
        this.hpStat = src.hpStat
        this.attackStat = src.attackStat
        this.defenseStat = src.defenseStat
        this.specialAttackStat = src.specialAttackStat
        this.specialDefenseStat = src.specialDefenseStat
        this.speedStat = src.speedStat
        this.move1 = src.firstMove["data"]["attributes"]
        // this.firstMoveType = src.firstMoveType
        this.move2 = src.secondMove["data"]["attributes"]
        // this.secondMoveType = src.secondMoveType
        this.move3 = src.thirdMove["data"]["attributes"]
        // this.thirdMoveType = src.thirdMoveType
        this.move4 = src.fourthMove["data"]["attributes"]
        // this.fourthMoveType = src.fourthMoveType
        this.constructor.all.push(this)
    }
    
    createMoveButtons() {
        for (const move of [this.move1, this.move2, this.move3, this.move4]){
            new Button(move.name, "./assets/button-blank.png", 200, 100, move.name, "move-select")
        }
    }

    createPokemonButton() {
        if (this.userID === currentPlayer){
            new Button(this.name, "./assets/button-blank.png", 200, 100, this.name, "pokemon-select")
        }
    }
    
}

// function setPlayerTeam() {
//     for (const pokemon of Pokemon.all) {
//         if (pokemon.userID === currentPlayer){
//             playerTeam.push(pokemon)
//         }
//     }
// }

// function setCPUTeam() {
//     for (const pokemon of Pokemon.all) {
//         if (pokemon.userID === cpuPlayer){
//             cpuTeam.push(pokemon)
//         }
//     }
// }