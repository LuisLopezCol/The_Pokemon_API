let pokedex = document.getElementById("pokedex_container");
let print_pokedex = (id) => {
  // --------------Print Characters---------------

  var url_api = "https://pokeapi.co/api/v2/pokemon/" + id;
  let api = fetch(url_api);
  api
    .then((res) => res.json())
    .then((data_pokemon) => {
      console.log(data_pokemon);
      //   pokedex.innerHTML = "";
      //   for (const data_pokemon of data_pokemon.result) {
      // if (items_pokedex.status == "Alive") {
      //   alive_color = "greenyellow";
      // } else if (items_pokedex.status == "Dead") {
      //   alive_color = "tomato";
      // } else if (items_pokedex.status == "unknown") {
      //   alive_color = "grey";
      // }
      pokedex.innerHTML = `           
        <div class="poke-image">
                    <div id="carousel-pokedex" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${parseInt(
                                  data_pokemon.id
                                )}.png.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/${
                                  data_pokemon.id
                                }.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${
                                  data_pokemon.id
                                }.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/${
                                  data_pokemon.id
                                }.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                  data_pokemon.id
                                }.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/${
                                  data_pokemon.id
                                }.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
                                  data_pokemon.id
                                }.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/${
                                  data_pokemon.id
                                }.png" class="d-block w-100 carousel-img" alt="...">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="poke-name center">${data_pokemon.name}</div>
                <div class="poke-id center">ID: ${data_pokemon.id}</div>
                <div class="chevron center">
                    <button class="poke-button-chev my-1"><i class="fa fa-chevron-left text-dark"
                            aria-hidden="true"></i></button>
                    <button class="poke-button-chev my-1"><i class="fa fa-chevron-right text-dark"
                            aria-hidden="true"></i></button>
                </div>
                <div class="type">
                    <div class="dscrpt-1 center"><i class="fas fa-bolt"></i></div>
                    <div class="dscrpt-2 center">Type:</div>
                    <div class="dscrpt-3 center">${data_pokemon.id}</div>
                </div>
                <div class="exp">
                    <div class="dscrpt-1 center"><i class="fas fa-lightbulb"></i></i></div>
                    <div class="dscrpt-2 center">Exp.:</div>
                    <div class="dscrpt-3 center">${
                      data_pokemon.base_experience
                    }</div>
                </div>
                <div class="height">
                    <div class="dscrpt-1 center"><i class="fas fa-ruler-combined"></i></i></div>
                    <div class="dscrpt-2 center">Height:</div>
                    <div class="dscrpt-3 center">${
                      data_pokemon.height
                    }0 cm</div>
                </div>
                <div class="weight">
                    <div class="dscrpt-1 center"><i class="fas fa-weight"></i></i></div>
                    <div class="dscrpt-2 center">Weight:</div>
                    <div class="dscrpt-3 center">${data_pokemon.weight} Kg</div>
                </div>
                <button type="button" class="abilities poke-button" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="poke_buttons("A")">A</button>
                <button type="button" class="moves poke-button" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="poke_buttons("M")">M</button>
                <button type="button" class="stats poke-button" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="poke_buttons("S")">S</button>
                      `;
      // }
      // ---------Footers logos-------

      //       info_footer.innerHTML = `
      // <div class="me-3">CHARACTERS: ${data_pokemon.info.count}</div>
      // <div class="me-3">LOCATIONS: 126</div>
      // <div class="">
      // EPISODES: 51
      // </div>
      // `;

      let pokemodal = document.getElementById("exampleModal");
      let modal_abilities = document.getElementById("abilities_text");
      let modal_moves = document.getElementById("moves_text");
      //   let modal_stats = document.getElementById("stats_text");
      let modal_name = document.getElementById("modal-abilities");

      let pokebuttons = (button_type) => {
        if (button_type == "A") {
          modal_name.innerText = `ABILITIES`;
          ability = data_pokemon.abilities.ability;
          ability.forEach((element) => {
            modal_abilities.innerHTML += `
                <li>${element.name}</li>
                `;
          });
        } else if (button_type == "M") {
          modal_name.innerText = `MOVES`;
          move = data_pokemon.moves.move;
          move.forEach((element) => {
            modal_moves.innerHTML += `
                <li>${element.name}</li>
                `;
          });
          //         } else if ((button_type = "S")) {
          modal_name.innerText = "STATS";
          //           ability = data_pokemon.moves.move;
          //           modal_stats.innerHTML = `
          //                           <p class="center">HP <span>123</span></p>
          //                             <p>ATTACK<span>32</span></p>
          //                             <p>DEFENSE<span>532</span></p>
          //                             <p>SUPER ATTACK<span>231</span></p>
          //                             <p>SUPER DEFENSE<span>41</span></p>
          //                             <p>SPEED<span>252</span></p>
          //                             <h2>GRAND TOTAL</h2>
          //                             <h3>34252</h3>
          // `;
        } else {
          pokemodal.innerHTML = "";
        }
      };
      pokebuttons("M");
    })
    .catch((error) => console.log(error));
};
print_pokedex(25);

// ---------Pages buttons-------

//       let previous_char = "";
//       let next_char = "";

//       if (data_pokemon.info.prev == null) {
//         previous_char = "disabled";
//       } else if (data_pokemon.info.next == null) {
//         next_char = "disabled";
//       }

//       button_pagesPN.innerHTML = `
//       <button class="pages link-help  button-prev ${previous_char}" onclick="print_pokedex('${data_pokemon.info.prev}')">PREVIOUS CHARACTERS</button>;
//       <button class="pages link-help  button-next ${next_char}" onclick="print_pokedex('${data_pokemon.info.next}')">NEXT CHARACTERS</button>;
//       `;
