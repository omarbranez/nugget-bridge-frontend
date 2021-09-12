// flow // this should really be a module
// ongoingBattle = true
function runBattle(attack){
    if (currentScreen === "battle" && menuState === "resolve" && !!(ongoingBattle) ){
        await playerAttack(attack)
    } else {
        alert("A battle is not currently ongoing!")
    }
    //start a chain
}

class BattleTurn { // attacker and defender
    constructor(currentPokemon, currentCPUPokemon, currentPokemonAttack, currentCPUPokemonAttack) {
        this.currentPokemon = currentPokemon
        this.currentCPUPokemon = currentCPUPokemon
    }

    currentPokemonAttack(){

    }
}
// let currentTurn
// let currentPokemon
// let currentCPUPokemon
competitors = [currentPokemon, currentCPUPokemon]
turnNumber = 0 // this will be declared on domload
goesFirst = checkSpeed()
goesSecond // the other one
// let computerMove
// if currentPlayer.currentPokemon.empty
//      if player.pokemonTeam is not empty
//          prompt to select new pokemon from party
//      else
//          winner = currentOpponent
//          ongoingBattle = false
//          render RESULTS <<<< separate method
//  else
//      newTurn AT END OF ATTACK
function cpuMove(){ // selected randomly
    let moveArray = [currentCPUPokemon.firstMove, currentCPUPokemon.secondMove, currentCPUPokemon.thirdMove, currentCPUPokemon.fourthMove]
    let randomMove =  moveArray[Math.floor(Math.random()*moveArray.length)]
    return randomMove
}



// compare speed of pokemon //
// goesFirst = math.max(player.currentPokemon.speed, computer.currentPokemon.speed)
// if player.currentPokemon.speed === computer.currentPokemon.speed
// add a random number and run goesFirst again
// goesFirst = math.max((player.currentPokemon.speed + math.random(), computer.currentPokemon.speed + math.random())
function whosFaster(){ //what if its equal
    if (currentPokemon.speedStat === currentCPUPokemon.speedStat) {
        let choice = [currentPokemon, currentCPUPokemon] //if tied, select at random
        let randomChoice = choice[Math.floor(Math.random()*choice.length)]
        return randomChoice
    }
    [currentPokemon, currentCPUPokemon].reduce((myPoke, cpuPoke) => myPoke.speedStat > cpuPoke.speedStat ? myPoke : cpuPoke)
}
// determine whose turn it is, and allow them to make move //
// if goesFirst = player
//      currentTurn = player
// else 
//      currentTurn = computer //
let goesFirst = whosFaster()
let attacker = goesFirst // a pokemon object, with STATS
let defender = !goesFirst
let attackMove //= // whosFaster's move
let attackStatUsed
let defenseStatUsed
// let attackDamage

let moveSuccessful
let randomModifier
let stabModifier
let burnModifier
let effectiveModifier
let critModifier
let faintedPokemon //boolean

// MOVE TO NEXT PHASE

// once both moves are made //
// DAMAGE PHASE using gen 8 formula, minus the double-battle "targets" and "weather" modifiers(for now). badge boosts dont exist
//      assume level is 100. assume PRIORITY MOVES dont exist yet
// if attacker and defender(
// goesFirst's attack
// let attacker = goesFirst >>>>>>>
// let defender = goesSecond >>>>>>>
// let attackStat
// let defenseStat 
// let turnsDone 
// if move.type = physical
//      attackStat = attacker.attack.value
//      defenseStat = defender.defense.value
// else 
//      attackStat = attacker.specialAttack.value
//      defenseStat = defender.specialDefense.value
function attackType(){
    if (attackMove.damage_type = "physical") { //damageType after serialization
        attackStatUsed = attacker.attackStat
        defenseStatUsed = defender.defenseStat
    } else {
        attackStatUsed = attacker.specialAttackStat
        defenseStatUsed = defender.specialDefenseStat
    }
}

function critCheck(){
    Math.floor(Math.random() * 17) === 16 ? critModifier = 1.5 : critModifier = 1
}

function randomCheck(){
    randomModifier = Math.floor(Math.random() * (Math.ceil(85) - Math.floor(100)) + Math.floor(100)) / 100
}

function effectiveCheck(){ // need to check if type 2 exists
    const noDamage = attackMove.type.no_damage_to.split(", ")
    const halfDamage = attackMove.type.half_damage_to.split(", ")
    const doubleDamage = attackMove.type.double_damage_to.split(", ")
    if (noDamage.includes(defender.type1.name)|| noDamage.includes(defender.type2.name)){ // maybe a switch, if it doesnt break anything again!
        effectiveModifier = 0
    } else {
        if (halfDamage.includes(defender.type1.name) && halfDamage.includes(defender.type2.name)) {
            effectiveModifier = 0.25
    } else {
        if ((halfDamage.includes(defender.type1.name) || halfDamage.includes(defender.type2.name)) && !(halfDamage.includes(defender.type1.name) && halfDamage.includes(defender.type.name))){
            effectiveModifier = 0.5
    } else {
        if ((doubleDamage.includes(defender.type1.name) || doubleDamage.includes(defender.type2.name)) && !(doubleDamage.includes(defender.type1.name) && doubleDamage.includes(defender.type.name))) {
            effectiveModifier = 2
    } else {
        if (doubleDamage.includes(defender.type1.name) && doubleDamage.includes(defender.type2.name)) {
            effectiveModifier = 4
    } else {
        effectiveModifier = 1
}}}}}}

function burnCheck(){
    if (attacker.Status === "Burn" && attackMove.damageType === "Physical"){
        burnModifier = 0.5
    } else {
        burnModifier = 1
    }
}

function stabCheck(){
    if (attacker.type1.name === attackMove.type.name || attacker.type2.name === attackMove.type.name){
        stabModifier = 1.5
    } else {
        stabModifier = 1
    }
}

function accuracyCheck(){
    let stageEvasion = 0
    let stageAccuracy = 0
    let accuracyModified = attackMove.accuracy * stageEvasion * 1
    let randomFactor = Math.floor(Math.random() * (Math.ceil(1) - Math.floor(100)) + Math.floor(100)) / 100
    if (randomFactor <= accuracyModified) {
        moveSuccessful = true
    }
}

function writeBattleDialogue(){
    displayDialog = `${attacker.name} used ${attackMove.name}!`
}

async function calculateDamage(){
    attackDamage = Math.floor(((((42 * attackMove.power * (attackStatUsed / defenseStatUsed)) / 50)) + 2) * critModifier * randomModifier * effectiveModifier * stabModifier * burnModifier)
}

async function resolveDamage(){
    await calculateDamage()
    defender.currentHP = defender.currentHP - attackDamage
    if (defender.currentHP <= 0) {
        defender.currentStatus = "Faint"
        faintedPokemon.push(defender)
    }
}

async function resolveEffectDamageForAttacker(){
    if (defender){
        await resolveDamage()
        if (attacker.currentStatus === "Burn" || attacker.currentStatus === "Poison"){
            attacker.currentHP = attacker.currentHP - Math.floor(attacker.hpStat / 16)
        }
        if (attacker.currentStatus === "Leech Seed"){
            let hpLeeched = Math.floor(attacker.hpStat / 8)
            attacker.currentHP = attacker.currentHP - hpLeeched
            defender.currentHP = defender.currentHP + hpLeeched
        }
        if (attacker.currentHP <= 0){
            attacker.currentStatus = "Faint"
            faintedPokemon.push(attacker)
        }
    } 

}

async function resolveEffectDamageForDefender(){ //refactor
    if (defender){
        await resolveEffectDamageForAttacker()
        if (defender.currentStatus === "Burn" || defender.currentStatus === "Poison"){
            defender.currentHP = defender.currentHP - Math.floor(defender.hpStat / 16)
        }
        if (defender.currentStatus === "Leech Seed"){
            let hpLeeched = Math.floor(defender.hpStat / 8)
            defender.currentHP = defender.currentHP - hpLeeched
            attacker.currentHP = attacker.currentHP + hpLeeched
        }
        if (defender.currentHP <= 0){
            defender.currentStatus = "Faint"
            faintedPokemon.push(defender)
        }
    }
}

async function setSecondPhase(){
    if (defender){
        await resolveEffectDamageForDefender()
        attacker = defender //something like this
        new Turn() //or something like that
    } else {
        await resolveEffectDamageForDefender()
    }
}

async function resolveFaintedPokemon(){
    await setSecondPhase()
    if (faintedPokemon) {
        if (currentPokemon.currentStatus = "Faint"){
            displayDialog = `${currentPokemon.userID}'s ${curretPokemon.name} has fainted!`
            //clear screen for user // or animate it dropping
            playerTeam.shift()
            replaceBattleOptionsWithPokemon() // account for the missing pokemon // finish writing the switch method
            //check on scope with the array switch
        }
        if (currentCPUPokemon.currentStatus = "Faint"){
            displayDialog = `Enemy ${currentCPUPokemon.name} has fainted!`
            //clear screen for cpu // or animate it dropping
            cpuTeam.shift()
            //send out pokemon in position 2, now 1
            currentCPUPokemon = cpuTeam[0]
            displayDialog = `Opposing trainer has sent out ${currentCPUPokemon}!`
            renderCPUPokemon() // without the initial setup chain
        }
    }
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