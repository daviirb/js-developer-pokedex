const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = [] ) => {
    const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name" id="${pokemon.name}">${pokemon.name}</span>
            
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div class="moreInformation" id="moreInfo">
                    <span>About</span>
                    <ol class="info">
                        <li>Height: ${pokemon.height/10} m </li>
                        <li>Weight: ${pokemon.weight/10} kg</li>
                    </ol>
                    <span>Abilities</span>
                    <ol class="abilities">
                    ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                    </ol>
                </div>
        </li>
        `).join('');

    pokemonList.innerHTML += newHtml;
        })
    }

loadPokemonItems(offset, limit); 

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if ( qtdRecordNextPage >= maxRecords) {
        const newLimit =  maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItems (offset, limit)
    }
});







