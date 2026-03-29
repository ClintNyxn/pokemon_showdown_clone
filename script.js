async function getRandPokemon() {
  random_number = Math.floor(Math.random(1) * 300) + 1;
  baseUrl = `https://pokeapi.co/api/v2/pokemon`;

  let dataPromise = await fetch(`${baseUrl}/${random_number}`);
  let pokemon = await dataPromise.json();
  return pokemon;
}

function getStats(pokemon) {
  let name = pokemon.name;
  let two = false;

  if (pokemon.types.length == 1) {
    var type1 = pokemon.types[0].type.name;
  } else {
    var type1 = pokemon.types[0].type.name;
    var type2 = pokemon.types[1].type.name;
    two = true;
  }

  let hp = pokemon.stats[0].base_stat;
  let atk = pokemon.stats[1].base_stat;
  let def = pokemon.stats[2].base_stat;
  let satk = pokemon.stats[3].base_stat;
  let sdef = pokemon.stats[4].base_stat;
  let speed = pokemon.stats[5].base_stat;

  return { name, two, type1, type2, hp, atk, def, satk, sdef, speed };
}

async function main() {
  const show_name = document.querySelector(".show_name");
  const show_type1 = document.querySelector(".show_type1");
  const show_type2 = document.querySelector(".show_type2");
  const show_hp = document.querySelector(".show_hp");
  const show_atk = document.querySelector(".show_atk");
  const show_def = document.querySelector(".show_def");
  const show_satk = document.querySelector(".show_satk");
  const show_sdef = document.querySelector(".show_sdef");
  const show_speed = document.querySelector(".show_speed");

  function setMessage(text) {
    const game_msg = document.querySelector(".game_message");
    game_msg.innerHTML = text;
  }
    let user_pokemons = [];
    let oppo_pokemons = [];

  for (let i = 0; i < 12; i++) {
    if (user_pokemons.length < 6) {
      user_pokemons.push(await getRandPokemon());
    } else {
      oppo_pokemons.push(await getRandPokemon());
    }
  }

  let user_curr_pokemon;
  let oppo_curr_pokemon;

  let user_curr_pokemon_img = document.querySelector(".user_curr_pokemon_img");
  let oppo_curr_pokemon_img = document.querySelector(".oppo_curr_pokemon_img");

  function setAsCurr(who, pokemon) {
    if (who == "user") {
      user_curr_pokemon = pokemon;
      user_curr_pokemon_img.src = pokemon.sprites.other.showdown.back_default;
      getMoves(pokemon);
    } else if (who == "oppo") {
      oppo_curr_pokemon = pokemon;
      oppo_curr_pokemon_img.src = pokemon.sprites.other.showdown.front_default;
    }
  }

  setAsCurr("user", user_pokemons[0]);
  setAsCurr("oppo", oppo_pokemons[0]);

  const pokemon_array = document.querySelectorAll(".array_pokemon");

  function displayAllPokemon() {
    let i = 0;
    if (i < 6) {
      pokemon_array.forEach((pokemon) => {
        pokemon.src = user_pokemons[i].sprites.front_default;
        i++;
      });
    }
  }

  displayAllPokemon();
  
  // click to pick pokemon
  pokemon_array.forEach((pokemon) => {
    pokemon.addEventListener("click", () => {
      index = pokemon.classList[0];
      setAsCurr("user", user_pokemons[index]);

      const game_msg = document.querySelector(".game_message");
      game_msg.innerHTML = `User switched to ${getStats(user_curr_pokemon).name}`;

      CpuDecision();
    });
  });

  const every_pokemon = document.querySelectorAll(".pokemon");
  const stat_box = document.querySelectorAll(".stat_box");

  every_pokemon.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      stat_box[0].classList.add("show");
      if (e.classList[0] == "user_curr_pokemon_img") {
        p = user_curr_pokemon;
      } else if (e.classList[0] == "oppo_curr_pokemon_img") {
        p = oppo_curr_pokemon;
      } else {
        index = e.classList[0];
        p = user_pokemons[index];
      }
      showInStatBox("pokemon", p);
    });

    e.addEventListener("mouseleave", () => {
      stat_box[0].classList.remove("show");
    });
  });

  function showInStatBox(x, p) {
    if (x == "move") {
      stats = p;
      show_hp.innerHTML = null;
      show_name.innerHTML = stats.move_name;
      show_type1.innerHTML = stats.move_type;
      show_type1.classList = stats.move_type;
      show_type2.innerHTML = null;
      show_type2.classList = null;
      show_satk.innerHTML = null;
      show_sdef.innerHTML = null;
      show_speed.innerHTML = null;

      show_atk.innerHTML = `base power - ${stats.power}`;
      show_def.innerHTML = `accuracy - ${stats.accuracy}`;

      if (stats.priority > 0) {
        show_sdef.innerHTML = `priority - ${stats.priority}`;
      }
    } else if (x == "pokemon") {
      stats = getStats(p);
      show_hp.innerHTML = stats.hp;
      show_name.innerHTML = stats.name;

      if (stats.two == true) {
        show_type1.innerHTML = stats.type1;
        show_type1.classList = stats.type1;
        show_type2.innerHTML = stats.type2;
        show_type2.classList = stats.type2;
      } else {
        show_type1.innerHTML = stats.type1;
        show_type1.classList = stats.type1;
        show_type2.innerHTML = "";
        show_type2.classList = "";
      }

      show_atk.innerHTML = `atk - ${stats.atk}`;
      show_def.innerHTML = `def - ${stats.def}`;
      show_satk.innerHTML = `special atk - ${stats.satk}`;
      show_sdef.innerHTML = `special def - ${stats.sdef}`;
      show_speed.innerHTML = `speed - ${stats.speed}`;
    }
  }

  const m = document.querySelectorAll(".move");

  async function getMoves(pokemon) {
    move_set = pokemon.moves;

    let moves_data = await Promise.all(
      move_set.map((x) => fetch(x.move.url).then((res) => res.json()))
    );

    let stab_move = moves_data.filter(
      (m) =>
        m.type.name == getStats(user_curr_pokemon).type1 ||
        (getStats(user_curr_pokemon).type2 &&
          m.type.name == getStats(user_curr_pokemon).type2)
    )[0];

    selected = moves_data
      .filter((m) => m.power != null && m.damage_class.name != "status")
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    selected.push(stab_move);

    const atk_type = document.querySelectorAll(".atk_type");
    const move_name = document.querySelectorAll(".move_name");

    for (i = 0; i < 4; i++) {
      category = selected[i].damage_class.name;
      move_name[i].innerHTML = selected[i].name;
      atk_type[i].classList = "atk_type " + i;
      atk_type[i].classList.add(category);
    }
  }

  function getMoveStats(move) {
    move_name = move.name;
    move_type = move.type.name;
    power = move.power;
    accuracy = move.accuracy;
    priority = move.priority;
    category = move.damage_class.name;

    return { move_name, move_type, power, accuracy, priority, category };
  }

  function calculateDamage(who, move) {

    typeChart = {
    normal:   { rock: 0.5, ghost: 0, steel: 0.5 },
    fire:     { grass: 2, ice: 2, bug: 2, steel: 2, fire: 0.5, water: 0.5, rock: 0.5, dragon: 0.5 },
    water:    { fire: 2, ground: 2, rock: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
    electric: { water: 2, flying: 2, electric: 0.5, grass: 0.5, ground: 0, dragon: 0.5 },
    grass:    { water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, dragon: 0.5, steel: 0.5 },
    ice:      { grass: 2, ground: 2, flying: 2, dragon: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
    fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, fairy: 0.5, ghost: 0 },
    poison:   { grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0 },
    ground:   { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, bug: 0.5, flying: 0 },
    flying:   { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
    psychic:  { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
    bug:      { grass: 2, psychic: 2, dark: 2, fire: 0.5, fighting: 0.5, poison: 0.5, flying: 0.5, ghost: 0.5, steel: 0.5, fairy: 0.5 },
    rock:     { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5 },
    ghost:    { psychic: 2, ghost: 2, dark: 0.5, normal: 0 },
    dragon:   { dragon: 2, steel: 0.5, fairy: 0 },
    dark:     { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 },
    steel:    { ice: 2, rock: 2, fairy: 2, fire: 0.5, water: 0.5, electric: 0.5, steel: 0.5 },
    fairy:    { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 }
  };   

    level = 50
    random_factor = Math.random() * 0.15 + 0.85;

    if (who == "user") {
      by_who = user_curr_pokemon;
      to_who = oppo_curr_pokemon;
    } else {
      to_who = user_curr_pokemon;
      by_who = oppo_curr_pokemon;
    }

    let move_type = getMoveStats(move).move_type;
    let defender = getStats(to_who);

    type_adv = 1;

    if (typeChart[move_type] && typeChart[move_type][defender.type1] !== undefined) {
      type_adv *= typeChart[move_type][defender.type1];
    }

    if (defender.two) {
      if (typeChart[move_type] && typeChart[move_type][defender.type2] !== undefined) {
        type_adv *= typeChart[move_type][defender.type2];
      }
    }

    if (getMoveStats(move).category == "special") {
      a = getStats(by_who).satk;
      d = getStats(to_who).sdef;
    } else if (getMoveStats(move).category == "physical") {
      a = getStats(by_who).atk;
      d = getStats(to_who).def;
    }

    if (
      getMoveStats(move).move_type == getStats(by_who).type1 ||
      getMoveStats(move).move_type == getStats(by_who).type2
    ) {
      curr_move_stab = 2;
    } else {
      curr_move_stab = 1;
    }

    let base = (((2 * level) / 5 + 2) * getMoveStats(move).power * a) / d / 50 + 2;

    let damage = base * curr_move_stab * type_adv * random_factor;
    damage = Math.floor(damage);

    return damage;
  }

  async function CpuDecision() {
    if (getStats(oppo_curr_pokemon).hp > 0) {
      random = Math.floor(Math.random() * 5);

      if (random <= 3) {
        let move_set = oppo_curr_pokemon.moves;

        let moves_data = await Promise.all(
          move_set.map((x) =>
            fetch(x.move.url).then((res) => res.json())
          )
        );

        let stab_move = moves_data.filter(
          (m) =>
            m.type.name == getStats(oppo_curr_pokemon).type1 ||
            (getStats(oppo_curr_pokemon).type2 &&
              m.type.name == getStats(oppo_curr_pokemon).type2)
        )[0];

    let dmg = calculateDamage("oppo", stab_move);
    let moveStats = getMoveStats(stab_move);

    setMessage(`${getStats(oppo_curr_pokemon).name} used ${moveStats.move_name} and dealt ${dmg} damage!`);

      } else {
        let alive = oppo_pokemons.filter(
          (p) => getStats(p).hp > 0
        );
        if (alive.length > 0) {
          next = alive[Math.floor(Math.random() * alive.length)];
          setAsCurr("oppo", next);
        }
      }
    } else {
      let alive = oppo_pokemons.filter(
        (p) => getStats(p).hp > 0
      );
      if (alive.length > 0) {
        next = alive[Math.floor(Math.random() * alive.length)];
        setAsCurr("oppo", next);
      }
    }
  }

  m.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      stat_box[0].classList.add("show");
      i = e.classList[1];
      showInStatBox("move", getMoveStats(selected[i]));
    });

    e.addEventListener("mouseleave", () => {
      stat_box[0].classList.remove("show");
    });

    e.addEventListener("click", () => {
      i = e.classList[1];
    let dmg = calculateDamage("user", selected[i]);
    let moveStats = getMoveStats(selected[i]);

    setMessage(`${getStats(user_curr_pokemon).name} used ${moveStats.move_name} for ${dmg} damage!`);
      
    CpuDecision();
    });
  });
}

main();