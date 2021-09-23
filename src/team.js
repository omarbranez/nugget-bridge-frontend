 async function renderMiniPics(){
    for (const pokemon of player.team){
        await pokemon.assignTeamWindowCoordinates()
        let pokePic = new Image()
        pokePic.src = pokemon.picSrc
        pokePic.onload = function() {
            teamPokemonPicturesContext.drawImage(pokePic, pokemon.xMiniPic, pokemon.yMiniPic, 133, 100)
        }
        teamPokemonTextContext.fillText(pokemon.name, pokemon.xMiniText, pokemon.yMiniText)
    }
}