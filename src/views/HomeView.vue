<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';
import CardPokemonSelected from '../components/CardPokemonSelected.vue';
import Topo from '../components/Bnt-Topo.vue';
import PainelHome from '../components/PainelHome.vue';

let urlBaseSvg = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/");
let allPokemons = reactive(ref([]));
let pokemons = ref([]);
let SearchPokemonField = ref("");
let pokemonSelected = reactive(ref());
let loading = ref(false);
let noResults = ref(false); // Variável para controlar se não houve resultados na pesquisa
let observeIntersection = true;

const limitToShow = 20; // Limite de Pokémon a serem exibidos por página
const evolutionInfo = ref(null); // Variável reativa para armazenar as informações de evolução
const pokTypes= [
      "all",      
      "normal", 
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dark",
      "steel",
      "dragon",
      "fairy"
];

const formatFirstLetter = (str) => {
return str.charAt(0).toUpperCase() + str.slice(1);
};

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1301")
    .then(res => res.json())
    .then(res => {
      allPokemons.value = res.results;
      updateVisiblePokemons();
      
    });

      const observer = new IntersectionObserver((entries) => {
        if (observeIntersection && entries[0].isIntersecting) {
          loadMorePokemons();
        }
      }, { threshold: 0.5 });
      observer.observe(document.querySelector('.load-more-trigger'));
    });

    const updateVisiblePokemons = () => {
      pokemons.value = allPokemons.value.slice(0, limitToShow);
    };

    const loadMorePokemons = () => {
      pokemons.value = allPokemons.value.slice(0, pokemons.value.length + limitToShow);
    };

const searchPokemon = (event) => {
  event.preventDefault();
  observeIntersection = false; // Impede a renderização do Intersection Observer
  const searchText = SearchPokemonField.value.trim().toLowerCase();
  if (searchText === '') {
    updateVisiblePokemons();
    return;
  }
  const filteredPokemons = allPokemons.value.filter(pokemon => {
    const nameMatches = pokemon.name.toLowerCase().includes(searchText);
    const idMatches = pokemon.url.split("/").reverse()[1].includes(searchText); // Obtém o número do URL
    return nameMatches || idMatches;
  });
  if (filteredPokemons.length === 0) {
    noResults.value = true; 
  } else {
    noResults.value = false;
    pokemons.value = filteredPokemons;
    SearchPokemonField.value = ''
  }
};

const searchByType = async (type) => {
  let pokemonDetails = [];
  
  if ('all'===type){
    observeIntersection = true; 
    updateVisiblePokemons();
  }
  else{
    observeIntersection = false; // Impede a renderização do Intersection Observer
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    
    pokemonDetails =  data.pokemon.map( (pokemon) => {
        return {
          name: pokemon.pokemon.name,
          url: pokemon.pokemon.url
        };
    });
  }
  
  if (pokemonDetails.length === null) {
    noResults.value = true; 
  } else {
    noResults.value = false;
    pokemons.value = pokemonDetails;
  }
};

const selectPokemon = async (pokemon) => {
  loading.value = true;
  const pokemonId = pokemon.url.split("/").reverse()[1]; // Obtém o ID do Pokémon a partir da URL
  try {
    // Primeiro fetch para obter as informações do Pokémon selecionado
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();
    pokemonSelected.value = pokemonData; // Atualiza o objeto pokemonSelected
    
    // Segundo fetch para obter as informações da espécie do Pokémon
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    const speciesData = await speciesResponse.json();
    const speciesId = speciesData.evolution_chain.url.split("/").reverse()[1];

    // Terceiro fetch para obter as informações de evolução do Pokémon
    const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${speciesId}`);
    const evolutionData = await evolutionResponse.json();
    evolutionInfo.value = evolutionData;
  } catch (error) {
    console.error("Erro ao buscar informações:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main>
    <PainelHome />
        <div class="container">
        <div class="row mt-5 d-flex justify-content-center">
        <div class="col-12 col-sm-12 col-md-12 d-flex flex-column align-items-center">

          <div class="card card-list">
            <div class="card-body row ">
              <form @submit="searchPokemon">
                <label for="SearchPokemonField" class="form-label">{{ $t('button.search')}}</label>
                <div class="mb-3 d-flex ">
                  <input v-model.trim="SearchPokemonField" type="text" class="form-control mx-2" id="SearchPokemonField" :placeholder="$t('button.search')+ '...'" >
                  <button type="submit" class="btn btn-primary">{{ $t('button.search')}}</button>
                </div>
              </form>
              <div class="d-flex flex-wrap mb-4">
                <button v-for="pokType in pokTypes"
                      :key="pokType"
                      @click="searchByType(pokType)" 
                      class="btn btn-primary m-1">{{ $t('types.' + pokType) }}</button>
                </div>

              <div v-if="noResults" class="alert alert-danger" role="alert">
                Nenhum resultado encontrado. 
              </div>

              <ListPokemons v-for="pokemon in pokemons" :key="pokemon.name"
                :name="formatFirstLetter(pokemon.name)" 
                :urlBaseSvg="urlBaseSvg + pokemon.url.split('/')[6] +  '.png'"
                @click="selectPokemon(pokemon)"
              />
              <!-- Elemento para o Intersection Observer -->
              <div class="load-more-trigger"></div>
              <div v-if="loading">
                <p>Carregando...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Topo />  
    
    <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">PokeInfo </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex justify-content-center">
              <CardPokemonSelected 
              :name="pokemonSelected?.name"
              :loading="loading"
              :index="pokemonSelected?.id"
              :especie="pokemonSelected?.types[0].type.name"
              :tipo="pokemonSelected?.types.length > 1 ? pokemonSelected?.types[1].type.name : pokemonSelected?.types[0].type.name"
              :img="pokemonSelected?.sprites.other.dream_world.front_default ?? null"
              :sprites="pokemonSelected?.sprites.front_default ?? null"
              :sprites1="pokemonSelected?.sprites.back_default ?? null"
              :sprites2="pokemonSelected?.sprites.front_female ?? null"
              :sprites3="pokemonSelected?.sprites.back_shiny ?? null"
              :sprites4="pokemonSelected?.sprites.back_shiny_female ?? null"
              :sprites5="pokemonSelected?.sprites.front_shiny_female ?? null"
              :sprites6="pokemonSelected?.sprites.front_shiny ?? null"
              :sprites7="pokemonSelected?.sprites.other.dream_world.front_default ?? null"
              :sprites8="pokemonSelected?.sprites.other.dream_world.front_female ?? null"
              :sprites9="pokemonSelected?.sprites.other.home.front_default ?? null"
              :sprites10="pokemonSelected?.sprites.other.home.front_shiny ?? null"
              :sprites11="pokemonSelected?.sprites.other.home.front_female ?? null"
              :sprites12="pokemonSelected?.sprites.other.home.front_shiny_female ?? null"
              :sprites13="pokemonSelected?.sprites.other.showdown.back_default ?? null"
              :sprites14="pokemonSelected?.sprites.other.showdown.back_female ?? null"
              :sprites15="pokemonSelected?.sprites.other.showdown.back_shiny ?? null"
              :sprites16="pokemonSelected?.sprites.other.showdown.front_default ?? null"
              :sprites17="pokemonSelected?.sprites.other.showdown.front_female ?? null"
              :sprites18="pokemonSelected?.sprites.other.showdown.front_shiny ?? null"
              :sprites19="pokemonSelected?.sprites.other.showdown.front_shiny_female ?? null"
              :sprites20="pokemonSelected?.sprites.other.showdown.back_shiny_female ?? null"
              :ataque="pokemonSelected?.abilities[0]?.ability.name ?? null"
              :ataque2="pokemonSelected?.abilities[1]?.ability.name ??null"
              :ataque3="pokemonSelected?.abilities[2]?.ability.name ?? null"
              :version="pokemonSelected?.game_indices?? null"
              :gameindex="pokemonSelected?.game_indices  ?? null"
              :evo1="evolutionInfo?.chain.species.name ?? null"
              :evo1Img="evolutionInfo?.chain.species.url.split('/')[6] ?? null"
              :evo2="evolutionInfo?.chain.evolves_to[0]?.species.name ?? null"
              :evo2Img="evolutionInfo?.chain.evolves_to[0]?.species.url.split('/')[6] ?? null"
              :evo3="evolutionInfo?.chain.evolves_to[0].evolves_to[0]?.species.name ?? null"
              :evo3Img="evolutionInfo?.chain.evolves_to[0].evolves_to[0]?.species.url.split('/')[6] ?? null"
              />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>

<style scoped>
/* Estilos específicos do componente */
.load-more-trigger {
  margin-top: -200px;
  height: 10px; /* Altura mínima para o Intersection Observer */
}
</style>