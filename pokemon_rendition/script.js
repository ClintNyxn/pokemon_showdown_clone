async function getRandPokemon(){
    random_number = Math.floor(Math.random(1)*493) + 1
    baseUrl = `https://pokeapi.co/api/v2/pokemon`

    let dataPromise = await fetch(`${baseUrl}/${random_number}`)
    let pokemon = await dataPromise.json()
    return pokemon
}

function getStats(pokemon) {
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
    
    return{name, two, type1, type2, hp, atk, def, satk, sdef, speed}
}

async function main() { 
    const show_name = document.querySelector('.show_name')  
    const show_type1 = document.querySelector('.show_type1')  
    const show_type2 = document.querySelector('.show_type2')  
    const show_hp = document.querySelector('.show_hp')  
    const show_atk = document.querySelector('.show_atk')  
    const show_def = document.querySelector('.show_def')  
    const show_satk = document.querySelector('.show_satk')  
    const show_sdef = document.querySelector('.show_sdef')  
    const show_speed = document.querySelector('.show_speed')  


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
    
    let user_curr_pokemon;
    let oppo_curr_pokemon;

    // display 0th as current pokemons//
    let user_curr_pokemon_img = document.querySelector(".user_curr_pokemon_img")
    let oppo_curr_pokemon_img = document.querySelector(".oppo_curr_pokemon_img")

    function setAsCurr(who,pokemon) {
        if (who == "user"){
            user_curr_pokemon = pokemon

            user_curr_pokemon_img.src = pokemon.sprites.other.showdown.back_default
            getmoves(pokemon)
        }else if (who == "oppo"){
            oppo_curr_pokemon = pokemon

            oppo_curr_pokemon_img.src = pokemon.sprites.other.showdown.front_default
        }
    }
    setAsCurr("user",user_pokemons[0])
    setAsCurr("oppo",oppo_pokemons[0])
    

    // display all in a line
    const pokemon_array = document.querySelectorAll(".array_pokemon") 

    function displayAllPokemon(){
        let i = 0 
        if (i < 6){
            pokemon_array.forEach((pokemon)=>{
                pokemon.src = user_pokemons[i].sprites.front_default 
                i++
            })
        }
    }displayAllPokemon()

    
    // click -> change //
    pokemon_array.forEach( pokemon => {
        pokemon.addEventListener('click',()=>{
            index = (pokemon.classList[0]) 
            setAsCurr("user",user_pokemons[index])
        })
    });
    
    // hover -> show stat-box //
    const every_pokemon = document.querySelectorAll(".pokemon")

    every_pokemon.forEach((e)=>{
        e.addEventListener('mouseenter', ()=>{
            if (e.classList[0]=="user_curr_pokemon_img"){
                p = user_curr_pokemon
            }else if (e.classList[0] =="oppo_curr_pokemon_img"){
                p = oppo_curr_pokemon
            }else{
                index = (e.classList[0])
                p = (user_pokemons[index])
            }
            showInStatBox(p)
        })
    })

    function showInStatBox(p){
        stats = getStats(p)
        show_hp.innerHTML = stats.hp
        show_name.innerHTML = stats.name
        
        if (stats.two == true){
            show_type1.innerHTML = stats.type1
            show_type2.innerHTML = stats.type2 
        }else{
            show_type1.innerHTML = stats.type1
            show_type2.innerHTML = ""
        }
        
        show_atk.innerHTML = `atk - ${stats.atk}`
        show_def.innerHTML = `def - ${stats.def}`
        show_satk.innerHTML = `special atk - ${stats.satk}`
        show_sdef.innerHTML = `special def - ${stats.sdef}`
        show_speed.innerHTML = `speed - ${stats.speed}`
    }
    
    async function getmoves(pokemon){
        move_set = (pokemon.moves)

        moves = await Promise.all(move_set.map(x => fetch(x.move.url).then(res => res.json())))

        let selected = moves
        .filter(x => x.power != null || x.damage_class.name != "status")
        .sort(() => Math.random() - 0.5)
        .slice(0,4)
        
        const m = document.querySelectorAll('.move')

        for(i=0;i<4;i++){
            m[i].innerHTML = selected[i].name + " "
            m[i].innerHTML += selected[i].power + " "
            m[i].innerHTML +=selected[i].type.name + ' '
            m[i].innerHTML += selected[i].accuracy
        }
        
    }getmoves(user_curr_pokemon)
        // name //
        // type
        // power
        // accurace
        // category

}main()