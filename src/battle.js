class Battle { // attacker and defender // this will run twice
    constructor(move) {
        this.currentPokemon = currentPokemon
        this.currentPokemon.move = move

        this.currentCPUPokemon = currentCPUPokemon
        
        this.turn = 1
        this.attacker//determined by goesFirst/whosFaster, then switches unless someone fainted
        this.defender //determined by goesFirst, then switches unless someone fainted
        this.attackStatUsed
        this.defenseStatUsed
        
        this.accuracyCheck = false// this should run first! unless something dumb like jump kick
        this.procCheck
        
        this.critModifier
        this.randomModifier
        this.effectiveModifier
        this.stabModifier
        this.burnModifier

        this.attackDamage

        // this.faintedPokemon = [] // boolean
        this.speedCheck()
        this.selectCPUMove()
        // run battle after creation
    }

    // RUNS IN THIS ORDER
    // SPEED CHECK
    // HIT CHECK => IF MISS, SWAP ATTACKER DEFENDER 
    // PROC CHECK
    // MODIFIER CHECKS
    // they can run concurrently, they arent dependable on each other

    // calcdamage has to be run separately

    selectCPUMove(){ // selected randomly
        let moveArray = [currentCPUPokemon.move1, currentCPUPokemon.move2, currentCPUPokemon.move3, currentCPUPokemon.move4]
        let randomMove =  moveArray[Math.floor(Math.random()*moveArray.length)]
        this.currentCPUPokemon.move = randomMove
    }

    speedCheck(){
        if (this.turn == 1){ //remove in chain later
            if (currentPokemon.speedStat === currentCPUPokemon.speedStat){ // if tied
                this.attacker = [currentPokemon, currentCPUPokemon][Math.floor(Math.random()*2)]
            } else {
                this.attacker = [currentPokemon, currentCPUPokemon].reduce((myPoke, cpuPoke) => myPoke.speedStat > cpuPoke.speedStat ? myPoke : cpuPoke)
            }
            this.defender = [currentPokemon, currentCPUPokemon].filter(poke => poke !== this.attacker)[0]
        }
    }

    hitCheck(){
        if (this.attacker.move.name === "Swift" || this.attacker.move.name === "Feint Attack" || this.attacker.move.name === "Aerial Ace" || this.attacker.move.name === "Aura Sphere"){
            this.accuracyCheck = true
        } else {
            let stageEvasion = 1 // not accounting for double team
            let stageAccuracy = 1 // not accounting for accuracy boosting moves
            let accuracyModified = this.attacker.move.accuracy * stageEvasion * stageAccuracy
            let randomFactor = Math.floor(Math.random() * (Math.ceil(1) - Math.floor(100)) + Math.floor(100)) / 100
            // debugger
            if (randomFactor <= accuracyModified) {
                this.accuracyCheck = true
    }}}   

    statCheck(){ // if damageType is not status
        if (this.attacker.move.damageType === "Physical"){ //UNLESS THOSE STUPID MOVES LIKE PSYSTRIKE
            this.attackStatUsed = this.attacker.attackStat
            this.defenseStatUsed = this.defender.defenseStat
        } else {
            if (this.attacker.move.damageType === "Special"){
                this.attackStatUsed = this.attacker.specialAttackStat
                this.defenseStatUsed = this.defender.specialDefenseStat
            }
        }
    }

    critCheck(){
        this.critModifier = Math.floor(Math.random() * 17) === 16 ? 1.5 : 1
    }

    randomCheck(){
        this.randomModifier = Math.floor(Math.random() * (Math.ceil(85) - Math.floor(100)) + Math.floor(100)) / 100
    }

    effectiveCheck(){ 
        const noDamage = this.attacker.move.type.no_damage_to.split(", ")
        const halfDamage = this.attacker.move.type.half_damage_to.split(", ")
        const doubleDamage = this.attacker.move.type.double_damage_to.split(", ")
        // debugger
        if (noDamage.includes(this.defender.type1.name) || noDamage.includes(this.defender.type2.name)){ // maybe a switch, if it doesnt break anything again!
            this.effectiveModifier = 0
        } else if (halfDamage.includes(this.defender.type1.name) && halfDamage.includes(this.defender.type2.name)) {
            this.effectiveModifier = 0.25
        } else if (halfDamage.includes(this.defender.type2.name)) {//|| halfDamage.includes(this.defender.type2.name)) && !((halfDamage.includes(this.defender.type1.name)) && halfDamage.includes(this.defender.type2.name))){
            this.effectiveModifier = 0.5
        } else if ((doubleDamage.includes(this.defender.type1.name) || doubleDamage.includes(this.defender.type2.name)) && !(doubleDamage.includes(this.defender.type1.name) && doubleDamage.includes(this.defender.type2.name))) {
            this.effectiveModifier = 2
        } else if (doubleDamage.includes(this.defender.type1.name) && doubleDamage.includes(this.defender.type2.name)) {
            this.effectiveModifier = 4
        } else {
            // debugger
            this.effectiveModifier = 1
        }
    }   

    burnCheck(){
        // debugger
        if (this.attacker.status === "Burn" && this.attacker.move.damageType === "Physical"){
            this.burnModifier = 0.5
        } else {
            this.burnModifier = 1
        }
    }

    stabCheck(){
        // debugger
        // if (!!(this.attacker.type2)) {
            if (this.attacker.type1.name === this.attacker.move.type.name || this.attacker.type2.name === this.attacker.move.type.name){
                this.stabModifier = 1.5
            }
            // else {
            //     if (this.attacker.type1.name === this.attacker.move.type.name) {
            //         this.stabModifier = 1.5
                 else {
                    this.stabModifier = 1
    }}

    calculateDamage(){ // skip if self status move
        displayDialog = `${this.attacker.name} used ${this.attacker.move}!`
        if (this.accuracyCheck === true) {
            // debugger
            this.attackDamage = Math.floor(((((42 * this.attacker.move.power * (this.attackStatUsed / this.defenseStatUsed)) / 50)) + 2) * this.critModifier * this.randomModifier * this.effectiveModifier * this.stabModifier * this.burnModifier)
        } else {
            this.attackDamage = 0
            if (!!(this.attacker.move.accuracy)){
                displayDialog = `${this.attacker.name}'s attack missed!`
            } else {
                // debugger
                displayDialog = "Lol this move doesn't do anything yet"
                // ()
            }
        }   
    }

    resolveEffects(){
        debugger
        if (this.attacker.move.name === "Magnet Rise" || this.attacker.move.name === "Double Team"){
            displayDialog = "Lol this move doesn't do anything yet"
        }
    }

    resolveDamage(){
        // await calculateDamage()
        this.defender.currentHP = this.defender.currentHP - this.attackDamage
        redrawHP(currentPokemon, 565, 275, 600, 288)
        redrawHP(currentCPUPokemon, 245, 75, 290, 88)
        if (this.defender.currentHP <= 0) {
            this.defender.currentStatus = "Faint"
            faintedPokemon.push(this.defender)
            this.attacker = ''        
        }
    }

    static async resolveEffectDamageForAttacker(){
        if (this.defender){
            await resolveDamage() //if status is NOT None
            if (this.attacker.currentStatus === "Burn" || this.attacker.currentStatus === "Poison"){
                this.attacker.currentHP = this.attacker.currentHP - Math.floor(this.attacker.hpStat / 16)
            }
            if (this.attacker.currentStatus === "Leech Seed"){
                let hpLeeched = Math.floor(this.attacker.hpStat / 8)
                this.attacker.currentHP = this.attacker.currentHP - hpLeeched
                this.defender.currentHP = this.defender.currentHP + hpLeeched
            }
            if (this.attacker.currentHP <= 0){
                this.attacker.currentStatus = "Faint"
                faintedPokemon.push(this.attacker)
                this.attacker = ''
            }// redraw hp again
        } 
    }

    static async resolveEffectDamageForDefender(){ //refactor
        if (this.defender){
            await resolveEffectDamageForAttacker()
            if (this.defender.currentStatus === "Burn" || this.defender.currentStatus === "Poison"){
                this.defender.currentHP = this.defender.currentHP - Math.floor(this.defender.hpStat / 16)
            }
            if (this.defender.currentStatus === "Leech Seed"){
                let hpLeeched = Math.floor(defender.hpStat / 8)
                this.defender.currentHP = this.defender.currentHP - hpLeeched
                this.attacker.currentHP = this.attacker.currentHP + hpLeeched
            }
            if (this.defender.currentHP <= 0){
                this.defender.currentStatus = "Faint"
                faintedPokemon.push(this.defender)
                this.defender = ''   
            }
        }
    }

    setSecondPhase(){
        if (!!this.defender && !!this.attacker){
            [this.attacker, this.defender] = [this.defender, this.attacker] //destructuring assignment array matching to swap the variables
        } else {
            resolveFaintedPokemon()
        }
    }

    resolveFaintedPokemon(){
        // if (faintedPokemon) {
        if (currentPokemon.currentStatus = "Faint"){
            animateText(`${currentPokemon.attributes.name}'s ${currentPokemon.name} has fainted!`)
            //clear screen for user // or animate it dropping
            playerTeam.shift()
            replaceBattleOptionsWithPokemon() // account for the missing pokemon // finish writing the switch method
            //check on scope with the array switch
        }
        if (currentCPUPokemon.currentStatus = "Faint"){
            animateText(`Enemy ${currentCPUPokemon.attributes.name}'s ${currentCPUPokemon.name} has fainted!`)
            //clear screen for cpu // or animate it dropping
            cpuTeam.shift()
            //send out pokemon in position 2, now 1
            currentCPUPokemon = cpuTeam[0]
            displayDialog = `Opposing trainer has sent out ${currentCPUPokemon}!`
            renderCPUPokemon() // without the initial setup chain
        }
        // }
    }

    runBattle(){
        this.hitCheck()
        this.statCheck()
        this.critCheck()
        this.randomCheck()
        // debugger
        this.effectiveCheck()
        this.burnCheck()
        this.stabCheck()
        this.calculateDamage()
        animateText(`${this.attacker.name} USED ${this.attacker.move.name}!`)
        // debugger
        this.resolveDamage()
        console.log(`${this.attacker.name} did ${this.attackDamage} damage to ${this.defender.name}!`)
        this.turn++
        if (this.turn == 2) {
            this.setSecondPhase()
            if (!!this.attacker && !!this.defender){
                this.runBattle()
            }
        }
        changeStateToBattleOptions()
    }

}

function writeBattleDialogue(){
    displayDialog = `${attacker.name} used ${attackMove.name}!`
}

async function newTurn(){
    await resolveFaintedPokemon()
    menuState = main // so fight, switch, and quit reappear
    new Turn() // something like that
}


// AFTER BATTLE //
//
//  let regenerateTeam
//      generate newpokemon and add to team until there are 6
// 
// if ongoingBattle = false && playerTeam.length > 0
// this will trigger an after_update callback
function deleteFaintedPokemon(){
    if (Battle.faintedPokemon.length > 0){
        for (const pokemon of Battle.faintedPokemon){
            fetch(`${teamsURL}/${pokemon.teamPokemonID}`, {
                method: 'DELETE',
            })
            .then((resp) => resp.json())
        }
    }
}

async function regeneratePokemon(id){ // probably not necessary
    // await // end of battle
    if (playerTeam.length < 6){
        fetch(`${usersURL}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }, 
        body: JSON.stringify({
            teamSize: playerTeam.length
        })
    }) // do i need an else to just move forward? to call new pokemon?
}}

function switchPokemonFromMenu(e){
    //switch case depending on which button was clicked
    
}

//  render results
//      if pokemonTeam.length === 0
//          render game over with number of battles won
//          set screen state to main menu
//      else
//          if 1 < pokemonTeam.length < 6
//              regenerate team
//          set screen state to overworld
//              
//
// 