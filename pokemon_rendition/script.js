async function getRandPokemon(){
    random_number = Math.floor(Math.random(1)*493) + 1
    baseUrl = `https://pokeapi.co/api/v2/pokemon`

    let dataPromise = await fetch(`${baseUrl}/${random_number}`)
    let pokemon = await dataPromise.json()
    return pokemon
}

function getStats(pokemon) {
    let sprite = pokemon.sprites.other.showdown
    let name = pokemon.name
    let two = false

    if(pokemon.types.length == 1){
        var type1 = pokemon.types[0].type.name
    }else{
        var type1 = pokemon.types[0].type.name
        var type2 = pokemon.types[1].type.name
        two = true
    }

    let hp = pokemon.stats[0].base_stat
    let atk = pokemon.stats[1].base_stat
    let def = pokemon.stats[2].base_stat
    let satk = pokemon.stats[3].base_stat
    let sdef = pokemon.stats[4].base_stat
    let speed = pokemon.stats[5].base_stat
    
    return{sprite, name, two, type1, type2, hp, atk, def, satk, sdef, speed}
}



async function main() { 
    const curr_name = document.querySelector('.curr_name')  
    const curr_sprite = document.querySelector('.curr_sprite')  
    const curr_type1 = document.querySelector('.curr_type1')  
    const curr_type2 = document.querySelector('.curr_type2')  
    const curr_hp = document.querySelector('.curr_hp')  
    const curr_atk = document.querySelector('.curr_atk')  
    const curr_def = document.querySelector('.curr_def')  
    const curr_satk = document.querySelector('.curr_satk')  
    const curr_sdef = document.querySelector('.curr_sdef')  
    const curr_speed = document.querySelector('.curr_speed')  


    // get 6 pokemons on each side 
    let user_pokemons = []
    let oppo_pokemons = []

    for(let i=0;i<12;i++){
        if (user_pokemons.length < 6){
            user_pokemons.push(await getRandPokemon())
        }else{
            oppo_pokemons.push(await getRandPokemon())
        }
    }
    
    // display 0th as current pokemon //
    setAsCurr(user_pokemons[1])
    
    async function setAsCurr(pokemon) {
        curr_hp.innerHTML = await getStats(pokemon).hp
        curr_name.innerHTML = await getStats(pokemon).name
        
        if (getStats(pokemon).two == true){
            curr_type1.innerHTML = await getStats(pokemon).type1
            curr_type2.innerHTML = await getStats(pokemon).type2 
        }else{
            curr_type1.innerHTML = await getStats(pokemon).type1
        }
        
        curr_sprite.src = getStats(pokemon).sprite.front_default
        curr_atk.innerHTML = `atk - ${getStats(pokemon).atk}`
        curr_def.innerHTML = `def - ${getStats(pokemon).def}`
        curr_satk.innerHTML = `satk - ${getStats(pokemon).satk}`
        curr_sdef.innerHTML = `sdef - ${getStats(pokemon).sdef}`
        curr_speed.innerHTML = `speed - ${getStats(pokemon).speed}`
    }

    // display all in a line
    function displayAllPokemon(){
        const array_pokemon = document.querySelectorAll(".array_pokemon") 

        let i = 0 
        if (i < 6){
            array_pokemon.forEach((pokemon)=>{
                pokemon.src = user_pokemons[i].sprites.front_default 
                i++
            })
        }
    }displayAllPokemon()

    // function showInStatBox(hp, name, type1,type2,atk,def,satk,sdef,speed){
    // }
    
    // click -> change //
    
    // hover -> show stat-box //
    const pokemons = document.querySelectorAll(".pokemon")
    const stat_box = document.querySelector(".stat_box")

    // pokemons.forEach((pokemon)=>{
    //     pokemon.addEventListener('mouseenter', (e)=>{
    //         console.log(pokemon)
    //     })
    // })
    

}main()