# pokemon project thing
A browser-based Pokemon battle game clone inspired by "Pokémon Showdown". It simulates turn-based battles with random teams, move selection, and basic damage calculation.
Built using HTML, CSS, and JavaScript, and integrates data from the *PokéAPI*.

## About the Game
1. each side gets 6 random pokemons
2. each pokemon has certain stats which can be accessed by hovering over the pokemon
3. user can click to select any of the 6 pokemon if said pokemon hasn’t fainted in their team
4. every pokmon gets 4 moves to use (moves can be of random type). move stats can be accessed by hovering over the move
5. Battle continues until all Pokémon faint on either side.

## Combat System and Game Logic
The combat system of this game takes into consideration 4 different stats, namely:
  1. type → type advantage delivers damage = atk*1.5
  2. atk,def → basic attack and defence stats
  3. special attack, special defence → secondary attack and defence
  4. speed → faster pokemons attack first

## How to play
1. select a move
2. faster pokemon goes first. 
3. use attack with type and category advantage
4. cpu can make a move or switch pokemon
5. damage is delivered and damage for cpu is calculated
6. damage is delivered

## Features
* Fetch Pokémon data using a PokeAPI
* Display and Interact with Pokémons with basic stats
* Moves and Calculation of damage
* Filtering, sorting, and searching using array methods to get moves/attacks/stats etc
* Clean and responsive UI

## Tech Stack
* HTML
* CSS
* JavaScript (Vanilla)
* PokéAPI (https://pokeapi.co/)


## Future Improvements
- Proper HP system & battle end conditions
- Smarter type advantage and switching logic
- Status moves & abilities
- Animations and smoother UI

## Starting Wireframe Design
<img width="999" height="851" alt="image" src="https://github.com/user-attachments/assets/c478b3a0-1ed2-43d7-b18a-cad51efd1633" />
