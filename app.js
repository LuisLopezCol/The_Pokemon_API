// ----------------------------------POKEDEX---------------------------------------

let print_pokedex = (id = 1, busqueda = false) => {
  let pokedex = document.getElementById("pokedex_container");
  let input_findit = document.getElementById("find_it_input").value;
  document.getElementById("find_it_input").value = "";

  if (!busqueda) {
    var url_api = "https://pokeapi.co/api/v2/pokemon/" + id;
  } else {
    var url_api = "https://pokeapi.co/api/v2/pokemon/" + input_findit;
  }
  let api = fetch(url_api);
  api
    .then((res) => res.json())
    .then((data_pokemon) => {
      poke_weight = data_pokemon.weight / 10; //To convert the weight in decimals and show it in kg
      pokedex.innerHTML = ""; // To reset the pokedex
      pokedex.innerHTML = `           
        <div class="poke-image">
                    <div id="carousel-pokedex" class="carousel slide " data-bs-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active" data-interval="1500">
                              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                data_pokemon.id
                              }.png" class="d-block w-100 carousel-img" alt="...">
                          </div>
                          <div class="carousel-item" data-interval="1500">
                              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${
                                data_pokemon.id
                              }.png" class="d-block w-100 carousel-img" alt="...">
                          </div>
                          <div class="carousel-item" data-interval="1500">
                                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
                                    data_pokemon.id
                                  }.png" class="d-block w-100 carousel-img" alt="...">
                                  </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="poke-name center">${data_pokemon.name}</div>
                <div class="poke-id center">ID: ${data_pokemon.id}</div>
                <div class="chevron center">
                    <button onclick="print_pokedex(${
                      data_pokemon.id - 1
                    })" class="poke-button-chev my-1"><i class="fa fa-chevron-left text-dark"
                            aria-hidden="true" ></i></button>
                    <button onclick="print_pokedex(${
                      data_pokemon.id + 1
                    })" class="poke-button-chev my-1"><i class="fa fa-chevron-right text-dark"
                            aria-hidden="true" ></i></button>
                </div>
                <div class="type">
                    <div class="dscrpt-1 center"><i class="fas fa-jedi"></i></i></div>
                    <div class="dscrpt-2 center">Type:</div>
                    <div class="dscrpt-3 fs-6" id="poke_type"></div>
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
                    <div class="dscrpt-3 center">${poke_weight} Kg</div>
                </div>
                <button type="button" class="abilities poke-button" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="pokebuttons('A')">A</button>
                <button type="button" class="moves poke-button" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="pokebuttons('M')">M</button>
                <button type="button" class="stats poke-button" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="pokebuttons('S')">S</button>
                      `;
      //This code is used to list all the types of each pokemonin the pokedex
      let poke_type = document.getElementById("poke_type");
      data_pokemon.types.forEach((element) => {
        poke_type.innerHTML += `
        <a href="${element.type.url}" style="text-decoration: none;" class="links">
        <li style="list-style: none;" class="type-text">${element.type.name}</li>
        </a>
        `;
      });

      // -----------------------------------Modal of the pokedex--------------------------------------

      let modal_name = document.getElementById("modal-abilities");
      let modal_abilities = document.getElementById("abilities_text");
      let modal_moves = document.getElementById("moves_text");
      let modal_stats = document.getElementById("stats_text");

      //Code to sum all the stats
      // data_pokemon.stats.forEach((element) => {
      //   total += element.base_stat;
      // });
      // console.log(total);

      // Since we have three buttons to open the modal, and IF statement was implemented to print what the user requires
      pokebuttons = (button_type) => {
        //Cleaning first teh dashboard
        modal_name.innerText = "";
        modal_abilities.innerHTML = ``;
        modal_moves.innerHTML = ``;
        modal_stats.innerHTML = ``;

        if (button_type == "A") {
          modal_name.innerText = `ABILITIES`;
          ability = data_pokemon.abilities;
          ability.forEach((element) => {
            modal_abilities.innerHTML += `
                <a href="${element.ability.url}" style="text-decoration: none;" class="links">
                <li>${element.ability.name}</li>
                </a>
                `;
          });
        } else if (button_type == "M") {
          modal_name.innerText = `MOVES`;
          move = data_pokemon.moves;
          move.forEach((element) => {
            modal_moves.innerHTML += `
                <a href="${element.move.url}" style="text-decoration: none;" class="links">
                <li>${element.move.name}</li>
                </a>
                `;
          });
        } else if ((button_type = "S")) {
          modal_name.innerText = "STATS";
          modal_stats.innerHTML = `
                <a href="${
                  data_pokemon.stats[0].stat.url
                }" style="text-decoration: none;" class="links">      
                <p class="center">HP<span>${
                  data_pokemon.stats[0].base_stat
                }</span></p>
                </a>
                <a href="${
                  data_pokemon.stats[1].stat.url
                }" style="text-decoration: none;" class="links">      
                <p>ATTACK<span>${data_pokemon.stats[1].base_stat}</span></p>
                </a>
                <a href="${
                  data_pokemon.stats[2].stat.url
                }" style="text-decoration: none;" class="links">      
                <p>DEFENSE<span>${data_pokemon.stats[2].base_stat}</span></p>
                </a>      
                <a href="${
                  data_pokemon.stats[3].stat.url
                }" style="text-decoration: none;" class="links">      
                <p>SUPER ATTACK<span>${
                  data_pokemon.stats[3].base_stat
                }</span></p>
                </a>      
                <a href="${
                  data_pokemon.stats[4].stat.url
                }" style="text-decoration: none;" class="links">      
                <p>SUPER DEFENSE<span>${
                  data_pokemon.stats[4].base_stat
                }</span></p>
                </a>      
                <a href="${
                  data_pokemon.stats[5].stat.url
                }" style="text-decoration: none;" class="links">      
                <p>SPEED<span>${data_pokemon.stats[5].base_stat}</span></p>
                <h2>GRAND TOTAL</h2>
                </a>      
                <h3>${
                  data_pokemon.stats[0].base_stat +
                  data_pokemon.stats[1].base_stat +
                  data_pokemon.stats[2].base_stat +
                  data_pokemon.stats[3].base_stat +
                  data_pokemon.stats[4].base_stat +
                  data_pokemon.stats[5].base_stat
                }</h3>
          `;
        } else {
          pokemodal.innerHTML = "";
        }
      };
      pokebuttons("S");
    })
    .catch((error) => console.log(error));
};
print_pokedex(1);

// -------------------------------------LIBRARY------------------------------------
let poke_library = (pagina = 1) => {
  let library = document.getElementById("poke_library");
  let lib_buttons = document.getElementById("library_buttons");

  if (pagina == 1 || pagina == null) {
    var url_apilib = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9";
  } else {
    var url_apilib = pagina;
  }
  library.innerHTML = "";
  let api = fetch(url_apilib);
  api
    .then((res) => res.json())
    .then((character) => {
      for (const element of character.results) {
        //The next code was written in order to get the ID of each pokemon and then with the url+id get the picture, this in order to avoid andother fetch
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        var data1 = element.url.substring(34, 35);
        var data2 = element.url.substring(35, 36);
        var data3 = element.url.substring(36, 37);
        var data4 = element.url.substring(37, 38);
        if (!isNumber(data1)) {
          data1 = "";
        }
        if (!isNumber(data2)) {
          data2 = "";
        }
        if (!isNumber(data3)) {
          data3 = "";
        }
        if (!isNumber(data4)) {
          data4 = "";
        }
        var totaldata = data1 + data2 + data3 + data4;
        library.innerHTML += `
        <a onclick="print_pokedex(${totaldata})" text links class="ghost center">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
          totaldata
        )}.png" alt="">
                <div class="lib-title center">${totaldata}-${element.name}</div>
            </a>
        `;
      }

      //Code to give funtionality to the buttons
      let previous_char = "";
      let next_char = "";
      if (character.previous == null) {
        previous_char = "disabled";
      } else if (character.next == null) {
        next_char = "disabled";
      }
      lib_buttons.innerHTML = `
            <button class="lib-buttons1" ${previous_char}
                onclick="poke_library('${character.previous}')">PREVIOUS</button>
            <button class="lib-buttons2" ${next_char} onclick="poke_library('${character.next}')">NEXT</button>
        `;
    })
    .catch((error) => console.log(error));
};
poke_library(1);
