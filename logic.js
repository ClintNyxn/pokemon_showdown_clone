const p1_sprite = document.querySelector('img') 

async function get_pokemon(){
    random_number = Math.floor(Math.random(1)*100)
    url = `https://pokeapi.co/api/v2/pokemon/${random_number}`

    let f = await fetch(url)
    let p = await f.json()
    return p
}

async function get_info(p) { 
    let pokemon = await p

    sprite = pokemon.sprites.other.showdown.front_default

    name = pokemon.name
    
    types = pokemon.types 

    hp = (pokemon.stats[0])
    atk = (pokemon.stats[1])
    def = (pokemon.stats[2])
    spa = (pokemon.stats[3])
    spd = (pokemon.stats[4])
    speed = (pokemon.stats[5])
    
    // moves = 
}

const user_pokemons = []
const oppo_pokemons = []

function pick_random_pokemon(){
    for(let i=0;i<12;i++){
        if (user_pokemons.length < 6){
            user_pokemons.push(get_pokemon())
        }else{
            oppo_pokemons.push(get_pokemon())
        }
        }
        
        random_pick = Math.floor(Math.random()*6)
}

pick_random_pokemon()
console.log(user_pokemons)
