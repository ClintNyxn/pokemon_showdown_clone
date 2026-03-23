async function getRandPokemon(){
    random_number = Math.floor(Math.random(1)*493) + 1
    baseUrl = `https://pokeapi.co/api/v2/pokemon`

    let dataPromise = await fetch(`${baseUrl}/${random_number}`)
    let pokemon = await dataPromise.json()
    return pokemon
}

let user_pokemons = []
let oppo_pokemons = []

async function main(){
    // get 6 pokemons on each side 
    for(let i=0;i<12;i++){
        if (user_pokemons.length < 6){
            user_pokemons.push(await getRandPokemon())
        }else{
            oppo_pokemons.push(await getRandPokemon())
        }
    }
    
    // make 0th index dislay pokemon
    let user_display_pokemon = user_pokemons[0]   
    let oppo_display_pokemon = oppo_pokemons[0]   

    // user display pokmeon -> back_defualt and vice versa
    const x = document.querySelector(".user_current_pokemon")
    const y = document.querySelector(".oppo_current_pokemon")
    x.src = (user_display_pokemon.sprites.other.showdown.back_default)
    y.src = (oppo_display_pokemon.sprites.other.showdown.front_default)

    // show rest of the pokemon
    let options = document.querySelectorAll(".userpoke")
    i = 0
    options.forEach(x => {
        x.src = user_pokemons[i].sprites.other.showdown.front_default 
        i++
    });
    
    // upon click, user_display_pokemon = clicked
    options.forEach( o => {
        o.addEventListener('click',(e => {
            user_display_pokemon = (user_pokemons[Number(o.classList[1])])
            x.src = (user_display_pokemon.sprites.other.showdown.back_default)
        }))
    });
    
    // get stats and type
    const every_poke = document.querySelectorAll(".pokemon")  

    every_poke.forEach(pokemon => {
        pokemon.addEventListener('mouseenter', ()=>{
            
            if(pokemon.classList[0] == "oppo_current_pokemon"){
                poke = (oppo_display_pokemon)
            }else if(pokemon.classList[0] == 'user_current_pokemon'){
                poke = (user_display_pokemon)
            }else{
                poke = (user_pokemons[pokemon.classList[1]])
            }
            
            // if(poke.types.length == 1){
            //     console.log(poke.types[0].type.name)
            // }else{
            //     console.log(poke.types[0].type.name)
            //     console.log(poke.types[1].type.name)
            // }
                

            poke_name = (poke.name)
            poke_hp = (poke.stats[0].base_stat)
            poke_atk = (poke.stats[1].base_stat)
            poke_def = (poke.stats[2].base_stat)
            poke_satk = (poke.stats[3].base_stat)
            poke_sdef = (poke.stats[4].base_stat)
            poke_speed = (poke.stats[5].base_stat)

            // show stats and type
            const stat_show = document.querySelector(".stat_show")
            stat_show.innerHTML = '' 
            stat_show.innerHTML +=  `name - ${poke_name} `
            stat_show.innerHTML +=  `atk - ${poke_atk} `
            stat_show.innerHTML +=  `def - ${poke_def} `
            stat_show.innerHTML +=  `speed - ${poke_speed} `
        }) 
    });
    
}main()