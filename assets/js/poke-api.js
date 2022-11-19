/* Regras de Negócio da aplicação - Back End */
const pokeApi = {};

// Conversão da model Pokemon a model utilizada nesta aplicação
function convertPokeApiDetailToModel(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  console.log('types \n', types);
  // Obtendo a primeira posição de types, se existir
  const [type] = types;
  console.log('type ', type);

  pokemon.type = type;
  pokemon.types = types;
  pokemon.img = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

// Requisição HTTP Secundária a PokeApi para obter o detalhe de cada Pokemon e
// conversão da model Pokemon a model utilizada nesta aplicação
pokeApi.getPokemonDetail = pokemon => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiDetailToModel);
};

// Requisição HTTP Principal a PokeApi para obter a listagem dos Pokemons
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  /* Montando a Requisição HTTP */
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .catch(error => console.error(error));
};

/* Documentação da evolução do código 
  //  Montando a Requisição HTTP - versão inicial
  const offset = 0;
  const limit = 10;

  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  // Processamento Assíncrono: retorna uma promise = a promessa de uma response
  // Versão com Encadeamento de callbacks
  fetch(url)
    .then(function (response) {
      response.json().then(function (responseBody) {
        console.log(responseBody);
      });
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      console.log('Requisição concluída!');
    });

  // Versão evitando o encadeamento de callbacks
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonBody) {
      console.log(jsonBody);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      console.log('Requisição concluída!');
    });

  // Versão utilizando arrow function
  fetch(url)
    .then(response => response.json())
    .then(jsonBody => console.log(jsonBody))
    .catch(error => console.error(error))
    .finally(() => console.log('Requisição concluída!'));

  // Versão consolidada com consumo inicial da Api
  // Utiliza a função convertPokemonToLi definida no arquivo main.js
  fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => {
      // console.log(pokemonList);

      for (let index = 0; index < pokemons.length; index++) {
        const pokemon = pokemons[index];
        // console.log(convertPokemonToLi(pokemon));
        pokemonList.innerHTML += convertPokemonToLi(pokemon);
      }
    })
    .catch(error => console.error(error))
    .finally(() => console.log('Requisição concluída!'));
*/
