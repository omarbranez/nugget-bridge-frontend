class ApiService {
    
    static createUser(e){
        e.preventDefault()
        modal.style.display="none"
        return fetch(`${usersURL}`, {
            method: 'POST', 
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.name.value,
                user_type: "player"
            })
        })
        .then(res => res.json())
    }

    static loadUser(e){
        e.preventDefault()
        modal.style.display = "none"
        return fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.name.value,
            })
        })
        .then(res => res.json())
    }
    
    static getPlayer(){
        return fetch(`${usersURL}/${playerID}`)
        .then(res => res.json())
        .then(json => {
            player = new Player(json.data)
            for (const pokemon of json.included){
                let poke = new Pokemon(pokemon)
                player.team.push(poke)
            }
            player.team.sort(sortTeam)
            player.currentPokemon = player.team[0]
        })
    }
    
    static getCPU(){
        return fetch(`${usersURL}/${String(parseInt(playerID)+1)}`) 
        .then(res => res.json())
        .then(json => {
            cpu = new Player(json.data)
            for (const pokemon of json.included){
                let poke = new Pokemon(pokemon)
                cpu.team.push(poke)
            }
            player.team.sort(sortTeam)
            cpu.currentPokemon = cpu.team[0]
        })
    }

    static updatePokemon(pokemon){
        fetch(`${teamsURL}/${pokemon.teamPokemonID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                current_hp: pokemon.currentHP,
                current_status: pokemon.status,
                position: pokemon.position
            })
        })
    }

    static updatePositions(trainer){
        for (const pokemon of trainer.team){
            fetch(`${teamsURL}/${pokemon.teamPokemonID}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    position: trainer.team.indexOf(pokemon) + 1
                })
            })
        }   
    }
    
}