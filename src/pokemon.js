class Pokemon {
    static all = []
    constructor(src) {
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

}