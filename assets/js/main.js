/* Regras de Negócio da aplicação - Front End */

/* Interatividade da aplicação */
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

/* Controle de Paginação */
const limit = 4;
let offset = 0;

/* Controle de máximo de registros - Limitados aos Pokemons de 1ª Geração */
const maxRecords = 151;

// Esta função é opcional podendo o código ser declarado dentro da função loadPokemonItems
// ou esta função pode deixar de existir e seu código ser utilizado com o corpo de uma
// arrow function
function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>
    <div class="pokemon-detail">
      <ol class="types">
        ${pokemon.types
          .map(type => `<li class="type ${type}">${type}</li>`)
          .join('')}
      </ol>
      <img
        src=${pokemon.img}
        alt=${pokemon.name}
      />
    </div>
  </li>`;
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
  });
}

// Executado quando a página que contém este script for carregada
loadPokemonItems(offset, limit);

// Evento responsável pela paginação
loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdeRecordNextPage = offset + limit;

  if (qtdeRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    // Removendo o botão de paginação ao alcançar o controle de máximo de registros
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

/* Documentação da evolução do código 
  
  O código abaixo 

  const listItems = [];

  for (let index = 0; index < pokemons.length; index++) {
    const pokemon = pokemons[index];
    // console.log(convertPokemonToLi(pokemon));
    // pokemonList.innerHTML += convertPokemonToLi(pokemon);
    listItems.push(convertPokemonToLi(pokemon));
  }

  é equivalente a 

  const newPokemonsList = pokemons.map(pokemon => {
    return convertPokemonToLi(pokemon);

  que é equivalente a 

  const newPokemonsList = pokemons.map(pokemon => convertPokemonToLi(pokemon));

  que é equivalente a 

  const newPokemonsList = pokemons.map(convertPokemonToLi);

  ######################

  O código abaixo 

  const newPokemonsList = pokemons.map(convertPokemonToLi);

  // Unificando a lista de pokemons sem nenhum separador em uma única string
  const newHtml = newPokemonsList.join('');

  pokemonList.innerHTML += newHtml;

  é equivalente a 

  const newPokemonsList = pokemons.map(convertPokemonToLi).join('');

  pokemonList.innerHTML += newPokemonsList;

  que é equivalente a

  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');

  ######################

  //  Versão inicial utilizando a model do PokeApi 
  function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map(
      typeSlot => `<li class="type">${typeSlot.type.name}</li>`
    );
  }
*/
