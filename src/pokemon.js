class Pokemon {
    static all = []
    constructor(src) {
        this.userID = src.userID
        this.name = src.name
        this.position = src.position
        this.currentHP = src.currentHP
        this.status = src.status
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