// flow

// make sure battle screen is loaded
// make sure battle enabled is true 
// 

// generate opponent team and name
// display message : trainer ${ name } wants to fight!

// beginning state of battle //
// let turnNumber = 0
// let goesFirst
// let goesSecond
// let currentTurn
// let player.currentPokemon
// let computer.currentPokemon
// let playerMove
// let computerMove
// if currentPlayer.currentPokemon.empty
//      if player.pokemonTeam is not empty
//          prompt to select new pokemon from party
//      else
//          winner = currentOpponent
//          render RESULTS
//  else
//      newTurn

// send out pokemon that is first in array // 
// let player.currentPokemon = player.pokemonTeam[0]
// render player.currentPokemon BUTT VIEW in player pokemon space in -X, -Y quadrant
// let computer.currentPokemon = computer.pokemonTeam[0]
// render computer.currentPokemon FRONT VIEW in computer pokemon space +X, +Y quadrant

// compare speed of pokemon //
// goesFirst = math.max(player.currentPokemon.speed, computer.currentPokemon.speed)
// if player.currentPokemon.speed === computer.currentPokemon.speed
// add a random number and run goesFirst again
// goesFirst = math.max((player.currentPokemon.speed + math.random(), computer.currentPokemon.speed + math.random())

// determine whose turn it is, and allow them to make move //
// if goesFirst = player
//      currentTurn = player
// else 
//      currentTurn = computer
//
// if currentTurn = player // there's probably a way to refactor this to take the state into account, switch turns, and just add in the menu if it's the player's turn
//      render moveMenu
//      let playerMove = X
//      currentTurn = computer
// else
//      currentTurn = computer     
//      let computerMove = Y
//      currentTurn = player
// if playerMove exists and computerMove exists 
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
// let criticalCheck
// if Math.floor(Math.random() *  17) // 1/16 chance for critical hit
//      criticalCheck = true 
// 
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
//          delete defender from playerTeam
//          attacker = ''
//          defender = ''
//      if turnsDone.length === 2
//          newTurn
//      else
//          changeTurn    