const sprite1 = document.querySelector(".sprite1");
const sprite2 = document.querySelector(".sprite2");

const poke_name1 = document.querySelector(".poke_name1");
const poke_name2 = document.querySelector(".poke_name2");

const type_p1 = document.querySelector(".type1");
const type_p2 = document.querySelector(".type2");
const def1 = document.querySelector(".def1");
const atk1 = document.querySelector(".atk1");
const speed1 = document.querySelector(".speed1");
const def2 = document.querySelector(".def2");
const atk2 = document.querySelector(".atk2");
const speed2 = document.querySelector(".speed2");

const move1 = document.querySelector(".move1");
const move2 = document.querySelector(".move2");
const move3 = document.querySelector(".move3");
const move4 = document.querySelector(".move4");

let op_move1 
let op_move2 
let op_move3 
let op_move4 

let ran1 = Math.floor(Math.random() * 721) + 1;
let ran2 = Math.floor(Math.random() * 721) + 1;

// random_btn.addEventListener('click', ()=>{
f1 = fetch(`https://pokeapi.co/api/v2/pokemon/${ran1}`);
f2 = fetch(`https://pokeapi.co/api/v2/pokemon/${ran2}`);
type_p1.innerHTML = "";
type_p2.innerHTML = "";

f1.then((res) => {
  res.json().then((pokemon) => {
    pokemon.types.forEach((t) => {
      type_p1.innerHTML += t.type.name + " ";
      type_p1.classList = t.type.name;
    });
    //
    // console.log(pokemon)
    atk1.innerHTML = "atk- " + pokemon.stats[1].base_stat;
    def1.innerHTML = "def- " + pokemon.stats[2].base_stat;
    speed1.innerHTML = "spd- " + pokemon.stats[5].base_stat;

    sprite1.src = pokemon.sprites.other.showdown.back_default;

    poke_name1.innerHTML = pokemon.species.name;
    poke_moves1 = [];
    for (let i of pokemon.moves) {
      poke_moves1.push(i.move.name);
    }
    four_moves = [move1, move2, move3, move4];
    for (let i = 0; i < 4; i++) {
      four_moves[i].innerHTML =
        poke_moves1[Math.floor(Math.random() * poke_moves1.length)];
    }
  });
}).catch((err) => console.log(err));

f2.then((res) => {
  res.json().then((pokemon) => {
    // console.log(pokemon)
    pokemon.types.forEach((t) => {
      type_p2.innerHTML += t.type.name + " ";
      type_p2.classList = t.type.name;
    });

    speed2.innerHTML = "spd- " + pokemon.stats[5].base_stat;

    sprite2.src = pokemon.sprites.other.showdown.front_default;

    poke_name2.innerHTML = pokemon.species.name;

    let poke_moves2 = [];
    for (let i of pokemon.moves) {
      poke_moves2.push(i.move.name);
    }
    four_moves = [op_move1, op_move2, op_move3, op_move4];
    // console.log(four_moves)
    for (let i = 0; i < 4; i++) {
      console.log(four_moves[i])
      four_moves[i].innerHTML = poke_moves2[Math.floor(Math.random() * poke_moves2.length)];
      // console.log(four_moves)
    }
  });
}).catch((err) => console.log(err));
