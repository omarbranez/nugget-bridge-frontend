class Pokemon {
    static all = []
    constructor(src) {
        this.teamPokemonID = src.id
        this.userID = src.attributes.userId
        // this.pokemonID = src.attributes.id
        this.position = src.attributes.position
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
    
    createMoveButtons() { 
        //remove all old move buttons
        for (const move of [this.move1, this.move2, this.move3, this.move4]){
                new Button(move.name, "./assets/button-blank.png", 200, 100, move.name, "move-select")
        }
        // debugger
        Object.assign(Button.find(this.move1.name), {
            xStart: 150,
            yStart: 325,
            textX: 195,
            textY: 385,
            percent: 1
        })
        Object.assign(Button.find(this.move2.name), {
            xStart: 150,
            yStart: 425,
            textX: 195,
            textY: 485,
            percent: 1
        })
        Object.assign(Button.find(this.move3.name), {
            xStart: 550,
            yStart: 325,
            textX: 595,
            textY: 385,
            percent: 1
        })
        Object.assign(Button.find(this.move4.name), {
            xStart: 550,
            yStart: 425,
            textX: 595,
            textY: 485,
            percent: 1
        })
        
    }

    static createPokemonButtons() { // 
        // remove all old mini pokemon
        for (const pokemon of this.all){
            if (pokemon.userID === playerID){
                new Button(pokemon.name, "./assets/button-blank.png", 200, 100, pokemon.name, "pokemon-select")
            }
        }   
        Object.assign(Button.find(playerTeam[0].name), { // position vs player team
            xStart: 350,
            yStart: 320,
            textX: 385, // 6 letter Moltres // position 1 // we can probably assign the different textX with a loop
            textY: 365,
            percent: 0.75
        })
        Object.assign(Button.find(playerTeam[1].name), { // position vs player team
            xStart: 350,
            yStart: 380,
            textX: 365, // 10 letter Weepinbell // position 2
            textY: 425,
            percent: 0.75
        })
        Object.assign(Button.find(playerTeam[2].name), { // position vs player team
            xStart: 350,
            yStart: 440,
            textX: 400, // 4 letter Jynx // position 3
            textY: 485,
            percent: 0.75
        })
        Object.assign(Button.find(playerTeam[3].name), { // position vs player team
            xStart: 550,
            yStart: 320,
            textX: 585, // 6 letter Snorlax // position 4
            textY: 365,
            percent: 0.75
        })
        Object.assign(Button.find(playerTeam[4].name), { // position vs player team
            xStart: 550,
            yStart: 380,
            textX: 585, // 7 letter Rattata // position 5
            textY: 425,
            percent: 0.75
        })
        Object.assign(Button.find(playerTeam[5].name), { // position vs player team
            xStart: 550,
            yStart: 440,
            textX: 585, // 6 letter Rhydon // position 6
            textY: 485,
            percent: 0.75
        })
    }

    
    
}
