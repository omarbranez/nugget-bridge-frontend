class Battle { // attacker and defender // this will run twice
    constructor(move, player, cpu) {
        this.currentPokemon = player.currentPokemon
        this.currentPokemon.move = move

        this.currentCPUPokemon = cpu.currentPokemon
        
        this.turn = 1
        this.attacker
        this.defender
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

        this.speedCheck()
        this.selectCPUMove()
        // run battle after creation
    }

    // RUNS IN THIS ORDER
    // SPEED CHECK
    // HIT CHECK => IF MISS, SWAP ATTACKER DEFENDER // what about jump kick/high jump kick
    // PROC CHECK
    // MODIFIER CHECKS
    // they can run concurrently, they arent dependable on each other

    // calcdamage has to be run separately

    selectCPUMove(){ // selected randomly
        let moveArray = [this.currentCPUPokemon.move1, this.currentCPUPokemon.move2, this.currentCPUPokemon.move3, this.currentCPUPokemon.move4]
        let randomMove =  moveArray[Math.floor(Math.random()*4)]
        this.currentCPUPokemon.move = randomMove
    }

    speedCheck(){
        // debugger
        if (this.turn == 1){ //remove in chain later
            if (this.currentPokemon.speedStat === this.currentCPUPokemon.speedStat){ // if tied
                this.attacker = [this.currentPokemon, this.currentCPUPokemon][Math.floor(Math.random()*2)]
            } else {
                this.attacker = [this.currentPokemon, this.currentCPUPokemon].reduce((myPoke, cpuPoke) => myPoke.speedStat > cpuPoke.speedStat ? myPoke : cpuPoke)
            }
            this.defender = [this.currentPokemon, this.currentCPUPokemon].filter(poke => poke !== this.attacker)[0]
    }}

    hitCheck(){
        if (this.attacker.move.name === "Swift" || this.attacker.move.name === "Feint Attack" || this.attacker.move.name === "Aerial Ace" || this.attacker.move.name === "Aura Sphere"){
            this.accuracyCheck = true
        } else {
            let stageEvasion = 1 // not accounting for double team
            let stageAccuracy = 1 // not accounting for accuracy boosting moves
            let accuracyModified = this.attacker.move.accuracy * stageEvasion * stageAccuracy
            let randomFactor = Math.floor(Math.random() * (Math.ceil(1) - Math.floor(100)) + Math.floor(100))// / 100
            // debugger
            console.log(accuracyModified)
            console.log(randomFactor)
            if (randomFactor <= accuracyModified) {
                this.accuracyCheck = true
            } else {
                this.accuracyCheck = false
                missed.text = `${this.attacker.name}'s attack missed!`
    }}}   

    statCheck(){ // if damageType is not status
        if (this.attacker.move.damageType === "Physical"){ //UNLESS THOSE STUPID MOVES LIKE PSYSTRIKE
            this.attackStatUsed = this.attacker.attackStat
            this.defenseStatUsed = this.defender.defenseStat
        } else {
            if (this.attacker.move.damageType === "Special"){
                this.attackStatUsed = this.attacker.specialAttackStat
                this.defenseStatUsed = this.defender.specialDefenseStat
    }}}

    critCheck(){
        if (Math.floor(Math.random() * 17) == 16){
            this.critModifier = 1.5
            critical.text = "It's a critical hit!"
        } else {
            this.critModifier = 1
    }}

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
            effective.text = `It doesn't affect ${this.defender.name}...`
        } else if (halfDamage.includes(this.defender.type1.name) && halfDamage.includes(this.defender.type2.name)) {
            this.effectiveModifier = 0.25
            effective.text = "It's not very effective..."
        } else if ((halfDamage.includes(this.defender.type1.name) || halfDamage.includes(this.defender.type2.name)) && !(doubleDamage.includes(this.defender.type1.name) || doubleDamage.includes(this.defender.type2.name))){
            this.effectiveModifier = 0.5
            effective.text = "It's not very effective..."
        } else if (doubleDamage.includes(this.defender.type1.name) && doubleDamage.includes(this.defender.type2.name)) { // && evaluates first
            this.effectiveModifier = 4
            effective.text = "It's super effective!"
        } else if ((doubleDamage.includes(this.defender.type1.name) || doubleDamage.includes(this.defender.type2.name)) && !(halfDamage.includes(this.defender.type1.name) || halfDamage.includes(this.defender.type2.name))) {
            this.effectiveModifier = 2
            effective.text = "It's super effective!"
        } else {
            // debugger
            this.effectiveModifier = 1
        }}
    // }debugger}   

    burnCheck(){
        // debugger
        if (this.attacker.status === "Burn" && this.attacker.move.damageType === "Physical"){
            this.burnModifier = 0.5
        } else {
            this.burnModifier = 1
    }}

    stabCheck(){
        if (this.attacker.type1.name === this.attacker.move.type.name || this.attacker.type2.name === this.attacker.move.type.name){
            this.stabModifier = 1.5
        } else {
            this.stabModifier = 1
    }}

    calculateDamage(){ // skip if self status move
        console.log(`${this.attacker.name} used ${this.attacker.move.name}!`)
        if (this.accuracyCheck == true && !!this.attacker.move.power) {
            this.attackDamage = Math.floor(((((42 * this.attacker.move.power * (this.attackStatUsed / this.defenseStatUsed)) / 50)) + 2) * this.critModifier * this.randomModifier * this.effectiveModifier * this.stabModifier * this.burnModifier)
        } else {
            this.attackDamage = 0
            if (!!this.attacker.move.accuracy && !!this.attacker.move.power){
                console.log(`${this.attacker.name}'s attack missed!`)
                animateText(missed.text)
            } else {
                console.log("Lol this move doesn't do anything yet")
    }}}

    resolveEffects(){
        debugger
        if (this.attacker.move.name === "Magnet Rise" || this.attacker.move.name === "Double Team"){
            console.log("Lol this move doesn't do anything yet")
        }
    }

    resolveDamage(){
        animateText(attack.text)
        animateText(effective.text)
        if (this.defender == this.currentCPUPokemon){
            redrawHP(this.currentCPUPokemon, 245, 75, 290, 88)
        } else if(this.defender == this.currentPokemon){
            redrawHP(this.currentPokemon, 565, 275, 600, 288)
        }
        this.defender.currentHP = this.defender.currentHP - this.attackDamage
        console.log(effective.text)
        this.defender.updatePokemon()
        console.log(`${this.attacker.name} did ${this.attackDamage} damage to ${this.defender.name}!`)
        if (this.defender.currentHP <= 0) {
            this.defender.currentStatus = "Faint"
            faintedPokemon.push(this.defender)
            // setTimeout(()=>resolveFaintedPokemon(),2000)
            setTimeout(()=>resolveMourner(),2000)

            this.attacker = ''
            this.defender = ''    
        }
    }

    // static async resolveEffectDamageForAttacker(){
    //     if (this.defender){
    //         await resolveDamage() //if status is NOT None
    //         if (this.attacker.currentStatus === "Burn" || this.attacker.currentStatus === "Poison"){
    //             this.attacker.currentHP = this.attacker.currentHP - Math.floor(this.attacker.hpStat / 16)
    //         }
    //         if (this.attacker.currentStatus === "Leech Seed"){
    //             let hpLeeched = Math.floor(this.attacker.hpStat / 8)
    //             this.attacker.currentHP = this.attacker.currentHP - hpLeeched
    //             this.defender.currentHP = this.defender.currentHP + hpLeeched
    //         }
    //         if (this.attacker.currentHP <= 0){
    //             this.attacker.currentStatus = "Faint"
    //             faintedPokemon.push(this.attacker)
    //             this.attacker = ''
    //         }// redraw hp again
    //     } 
    // }

    // static async resolveEffectDamageForDefender(){ //refactor
    //     if (this.defender){
    //         await resolveEffectDamageForAttacker()
    //         if (this.defender.currentStatus === "Burn" || this.defender.currentStatus === "Poison"){
    //             this.defender.currentHP = this.defender.currentHP - Math.floor(this.defender.hpStat / 16)
    //         }
    //         if (this.defender.currentStatus === "Leech Seed"){
    //             let hpLeeched = Math.floor(defender.hpStat / 8)
    //             this.defender.currentHP = this.defender.currentHP - hpLeeched
    //             this.attacker.currentHP = this.attacker.currentHP + hpLeeched
    //         }
    //         if (this.defender.currentHP <= 0){
    //             this.defender.currentStatus = "Faint"
    //             faintedPokemon.push(this.defender)
    //             this.defender = ''   
    //         }
    //     }
    // }

    setSecondPhase(){
        if (!!this.defender && !!this.attacker){
            [this.attacker, this.defender] = [this.defender, this.attacker] //destructuring assignment array matching to swap the variables
            this.runBattle()
        // } else {
        //     debugger
        //     resolveFaintedPokemon()
        }
    }

    runBattle(){
        menuState = "turn"
        attack.text = `${this.attacker.name} USED ${this.attacker.move.name}!`
        this.hitCheck()
        this.statCheck()
        this.critCheck()
        this.randomCheck()
        this.effectiveCheck()
        this.burnCheck()
        this.stabCheck()
        this.calculateDamage()
        // animateText(attack.text)
        this.resolveDamage()
        this.endTurn()
    }
    
    endTurn(){
        Message.clear()
        // counter = 0
        if (!!this.attacker && !!this.defender){
            this.turn++
        }
        if (this.turn == 2) {
            setTimeout(() => this.setSecondPhase(), 2000)
        } else if (this.turn == 3 && !!this.attacker && !!this.defender) {
            setTimeout(()=> changeStateToBattleOptions(), 2000)
        }
    }

}


async function promptToContinue(){
    await determineMourner()
    return response = confirm("Would you like to battle again?")//modal wont work for this
}

async function resolveGameEnd(){
    await promptToContinue()
    if (response == true){
        restartBattle()
    } else {
        restartGame()
    }
    response = ''
}
function restartBattle(){
    clearForeground()
    clearBlueWindow()
    renderGameWindow()
    renderTeamWindow()
    changeStateToBattleOptions()
}

function restartGame(){
    Player.clear
    menuState = "title"
    currentScreen = "title"
    result = ''
    clearScreen()
    battlePokemonContext.clearRect(0,0,battlePokemonCanvas.width,battlePokemonCanvas.height)
    hpBarContext.clearRect(0,0,hpBarCanvas.width,hpBarCanvas.height)
    clearBlueWindow()
    renderGameWindow()
    renderTeamWindow()
    window.addEventListener('keyup', titleHandler)
}

function deleteFaintedPokemon(){
    if (faintedPokemon.length > 0){
        for (const pokemon of faintedPokemon){
            return fetch(`${teamsURL}/${pokemon.teamPokemonID}`, {
                method: 'DELETE',
            })
            // .then((resp) => resp.json())
        }
        faintedPokemon = []
    }
}

function regeneratePokemon(){ // probably not necessary
    // await // end of battle
    if (player.team.length < 6){ // or if BEFORE i call it
        return fetch(`${usersURL}/${player.id}`)
        .then(res = res.json())
        .then(json => {
            // while (player.team.length < 6){ // they've already been created, just merge them!
            if (!Pokemon.all.includes(json.included)){
                new Pokemon(json.included)
            }
        })
    } // do i need an else to just move forward? to call new pokemon?
}

function switchPokemonFromMenu(position){
    //switch case depending on which button was clicked
    let temp = player.team[0]
    player.team[0] = player.team[position]
    player.team[position] = temp
    player.currentPokemon = player.team[0]
    player.updatePositions()
    reinitializePokemon()
}

function reinitializePokemon(){
    battlePokemonContext.clearRect(150, 140, 200, 200) // pokemon
    battlePokemonContext.clearRect(500,215,200,50) // name
    hpBarContext.clearRect(0,0,hpBarCanvas.width,hpBarCanvas.height)    
    teamPokemonPicturesContext.clearRect(0,0,teamPokemonPicturesCanvas.width, teamPokemonPicturesCanvas.height)
    teamPokemonTextContext.clearRect(0,0,teamPokemonTextCanvas.width,teamPokemonTextCanvas.height)
    renderMiniPics()
    clearBlueWindow()
    Button.all = []
    renderPokemon("player")
    createMoveButtons()
    createPokemonButtons()
    drawHpBar()
    changeStateToBattleOptions()
}

function clearForeground(){
    battlePokemonContext.clearRect(150, 140, 200, 200) // pokemon
    battlePokemonContext.clearRect(500,215,200,50) // name
    //hp bar?
    teamPokemonPicturesContext.clearRect(0,0,teamPokemonPicturesCanvas.width, teamPokemonPicturesCanvas.height)
    teamPokemonTextContext.clearRect(0,0,teamPokemonTextCanvas.width,teamPokemonTextCanvas.height)
}
function determineMourner(){
    for (let pokemon of faintedPokemon){
        mourner = [player, cpu].find( user => user.playerID == String(pokemon.userID))
        mourner.currentPokemon = ''
        mourner.team.shift()
        faint.text = `${mourner.name}'S ${pokemon.name} HAS FAINTED!`
        animateText(faint.text)
        faintedPokemon.shift()
    }
}

async function resolveMourner(){
    await determineMourner()
    if (mourner == player) {
        if (player.team.length == 0){
            result = "lose"
            resolveGameEnd()
        } else {
            battlePokemonContext.clearRect(150, 140, 200, 200)
            setTimeout(() => clearBlueWindow(), 3000)
            setTimeout(() => changeStateToSwitch(), 4000)
        }
    } else {
        if (cpu.team.length == 0){
            result = "win"
            resolveGameEnd()
        } else {
            cpu.currentPokemon = cpu.team[0]
            cpu.updatePositions()
            battlePokemonContext.clearRect(175,20,200,100)
            battlePokemonContext.clearRect(550, 20, 200, 200)
            setTimeout(()=>renderPokemon(cpu),3000)
            setTimeout(()=>drawHpBar(),3000)
            setTimeout(()=>animateText(`ENEMY ${cpu.name} HAS SENT OUT ${cpu.currentPokemon.name}!`), 4000)
            setTimeout(()=>clearBlueWindow(), 6500)
            setTimeout(()=>changeStateToBattleOptions(),7000)
        }
    }
}

