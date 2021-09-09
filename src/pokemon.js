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
        this.firstMove = src.firstMove
        this.secondMove = src.secondMove
        this.thirdMove = src.thirdMove
        this.fourthMove = src.fourthMove
        this.constructor.all.push(this)
    }
    
    createMoveButtons() {
        // await drawHpBar()
        // const moveArray = [this.firstMove, this.secondMove, this.thirdMove, this.fourthMove]
        for (const move of [this.firstMove, this.secondMove, this.thirdMove, this.fourthMove]){
            // debugger
            new Button(move, "./assets/button-blank.png", 200, 100, move, "move-select")
        }
    }

    // renderTeamWindowPokemon(){
    //     this.
    // }
    
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