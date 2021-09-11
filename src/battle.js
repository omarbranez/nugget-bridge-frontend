// flow // this should really be a module

// make sure battle screen is loaded
// make sure battle enabled is true 
function runBattle(attack){
    if (currentScreen === "battle" && menuState === "resolve" && !!(ongoingBattle) ){
        await playerAttack(attack)
    } else {
        alert("A battle is not currently ongoing!")
    }
    //start a chain
}

// generate opponent team and name
// display message : trainer ${ name } wants to fight! // shouldve happened already

// beginning state of battle //
// let ongoingBattle = true // it's already true


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

let randomFactor


function calculateDamageToDefender(){ //this would work better if moves were passed as objects //we'll do that tomorrow
}

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
// let criticalCheck
// if Math.floor(Math.random() *  17) // 1/16 chance for critical hit
//      criticalCheck = true 
// 
function critCheck(){
    randomFactor = Math.floor(Math.random() * ( (Math.ceil(85) - Math.floor(100)) + Math.floor(100) ) / 100)
    return randomFactor
}
// let randomFactor = Math.floor(Math.random() * ( (Math.ceil(85) - Math.floor(100)) + Math.floor(100) ) / 100 // a decimal between 0.85 and 1.00 inclusive
// 
// let typeCheck 
// swtich defender.type
//  case attacker.move.type.no_damage_to.includes(defender.type) <<<<< refactor THIS
//      typeCheck = 0
//  case attacker.move.type.half_damage_to.includes(defender.type)  
//      typeCheck = 0.5
//  case attacker.move.type.double_damage_to.includes(defender.type)
//      typeCheck = 2
//  default 
//      typeCheck = 1
//  
//  let burnCheck
//      if attacker.currentStatus = burn
//          burnCheck = 0.5
//      else
//          burnCheck = 1
//
// damage = (  ( (42 * move.power * (attackStat / defenseStat) )/(50) ) + 2 ) 
//                * (if (criticalCheck) return 1.5 else return 1) 
//                * randomFactor //can be between 0.85 and 1.00
//                * typeCheck // can be either 0, 0.5, 1, 2
//                * stabCheck // can be either 1 or 1.5
//                * burnCheck // can be either 0.5 or 1 
//          ) MATH.FLOOR (we'll round to integer)
//
// let resolveDamage = defender.hp = defender.hp - damage
// let resolveCheck
//      if defender.hp > 0
//          turnsDone.push(playerThatJustWent)
//          currentTurn = oppositePlayer // maybe wont need this
//          attacker = oppositePlayer
//          defender = playerThatJustWent
//      else 
//          turnsDone.push(lolYouDied)
//          render pokemon fainting
//          delete defender from playerTeam
//          attacker = ''
//          defender = ''
//      if turnsDone.length === 2
//          newTurn
//      else
//          changeTurn    







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