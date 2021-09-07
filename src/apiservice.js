class ApiService {
    
    static getAllTeamPokemon(){
        return fetch(teamsURL)
        .then(res => res.json())
    }

    static getAllUsers(){
        return fetch(usersURL)
        .then(res => res.json())
    }
}