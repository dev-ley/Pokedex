<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';
import CardPokemonSelected from '../components/CardPokemonSelected.vue';
import Topo from '../components/Topo.vue';
import PainelHome from '../components/PainelHome.vue';




let urlBaseSvg = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/");
let allPokemons = reactive(ref([]));
let pokemons = ref([]);

let SearchPokemonField = ref("");
let pokemonSelected = reactive(ref());
let loading = ref(false);
let noResults = ref(false); // Variável para controlar se não houve resultados na pesquisa
const limitToShow = 15; // Limite de Pokémon a serem exibidos por página
let observeIntersection = true;


const pokemonList = ref([]);
const selectedType = ref(''); // Variável reativa para armazenar o tipo selecionado
const evolutionInfo = ref(null); // Variável reativa para armazenar as informações de evolução

const searchByType = async (type) => {
  selectedType.value = type; // Atualiza o tipo selecionado

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    
    const pokemonDetails = await Promise.all(data.pokemon.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return {
        name: pokemonData.name,
        image: pokemonData.sprites.front_default
      };
    }));



    pokemonList.value = pokemonDetails; // Atualiza a lista de Pokémon com base no tipo selecionado
    console.log(pokemonList.value);
  } catch (error) {
    console.error("Erro ao buscar Pokémon por tipo:", error);
  }
};

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
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
    noResults.value = true; // Nenhum Pokémon encontrado
  } else {
    noResults.value = false;
    pokemons.value = filteredPokemons;
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

    // Segundo fetch para obter as informações de evolução do Pokémon
    const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`);
    const evolutionData = await evolutionResponse.json();
    console.log("Informações de evolução:", evolutionData);
    evolutionInfo.value = evolutionData;
    // Aqui você pode fazer o que precisa com as informações de evolução
  } catch (error) {
    console.error("Erro ao buscar informações de evolução:", error);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <main>

    <PainelHome />
    <div class="d-flex flex-wrap">
          <button type="button" @click="searchByType('normal')" class="btn btn-primary m-1">{{ $t('types.normal') }}</button>
          <button type="button" @click="searchByType('fire')" class="btn btn-primary m-1">{{ $t('types.fire') }}</button>
          <button type="button" @click="searchByType('water')" class="btn btn-primary m-1">{{ $t('types.water') }}</button>
          <button type="button" @click="searchByType('electric')" class="btn btn-primary m-1">{{ $t('types.electric') }}</button>
          <button type="button" @click="searchByType('grass')" class="btn btn-primary m-1">{{ $t('types.grass') }}</button>
          <button type="button" @click="searchByType('ice')" class="btn btn-primary m-1">{{ $t('types.ice') }}</button>
          <button type="button" @click="searchByType('fighting')" class="btn btn-primary m-1">{{ $t('types.fighting') }}</button>
          <button type="button" @click="searchByType('poison')" class="btn btn-primary m-1">{{ $t('types.poison') }}</button>
          <button type="button" @click="searchByType('ground')" class="btn btn-primary m-1">{{ $t('types.ground') }}</button>
          <button type="button" @click="searchByType('flying')" class="btn btn-primary m-1">{{ $t('types.flying') }}</button>
          <button type="button" @click="searchByType('psychic')" class="btn btn-primary m-1">{{ $t('types.psychic') }}</button>
          <button type="button" @click="searchByType('bug')" class="btn btn-primary m-1">{{ $t('types.bug') }}</button>
          <button type="button" @click="searchByType('rock')" class="btn btn-primary m-1">{{ $t('types.rock') }}</button>
          <button type="button" @click="searchByType('ghost')" class="btn btn-primary m-1">{{ $t('types.ghost') }}</button>
          <button type="button" @click="searchByType('dark')" class="btn btn-primary m-1">{{ $t('types.dark') }}</button>
          <button type="button" @click="searchByType('steel')" class="btn btn-primary m-1">{{ $t('types.steel') }}</button>
          <button type="button" @click="searchByType('dragon')" class="btn btn-primary m-1">{{ $t('types.dragon') }}</button>
          <button type="button" @click="searchByType('fairy')" class="btn btn-primary m-1">{{ $t('types.fairy') }}</button>
        </div>
        <div class="container">
      <div class="row mt-5 d-flex justify-content-center">
        <div class="col-12 col-sm-12 col-md-12 d-flex flex-column align-items-center">

          <div class="card card-list">
            <div class="card-body row">
              <form @submit="searchPokemon">
                <label for="SearchPokemonField" class="form-label">Pesquisar</label>
                <div class="mb-3 d-flex">
                  <input v-model.trim="SearchPokemonField" type="text" class="form-control" id="SearchPokemonField" placeholder="Pesquisar..." required>
                  <button type="submit" class="btn btn-primary">Buscar</button>
                </div>
              </form>

              <div v-if="noResults" class="alert alert-danger" role="alert">
                Nenhum resultado encontrado. 
              </div>

              <ListPokemons v-for="pokemon in pokemons" :key="pokemon.name"
                :name="pokemon.name"
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

    <Topo />       <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Pokemon </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex justify-content-center">
              <CardPokemonSelected 
              :name="pokemonSelected?.name"
              :loading="loading"
              :index="pokemonSelected?.id"
              :especie="pokemonSelected?.types[0].type.name"
              :tipo="pokemonSelected?.types.length > 1 ? pokemonSelected?.types[1].type.name : pokemonSelected?.types[0].type.name"
              :img="pokemonSelected?.sprites.other.dream_world.front_default"
              :sprites="pokemonSelected?.sprites.front_default"
              :sprites1="pokemonSelected?.sprites.back_default"
              :sprites2="pokemonSelected?.sprites.front_female"
              :sprites4="pokemonSelected?.sprites.back_shiny"
              :sprites5="pokemonSelected?.sprites.back_shiny_female"
              :sprites7="pokemonSelected?.sprites.front_shiny_female"
              :sprites21="pokemonSelected?.sprites.front_shiny"
              :sprite19="pokemonSelected?.sprites.other.dream_world.front_default"
              :sprite20="pokemonSelected?.sprites.other.dream_world.front_female"
              :sprites8="pokemonSelected?.sprites.other.home.front_default"
              :sprites9="pokemonSelected?.sprites.other.home.front_female"
              :sprites10="pokemonSelected?.sprites.other.home.front_shiny"
              :sprites11="pokemonSelected?.sprites.other.home.front_shiny_female"
              :sprites12="pokemonSelected?.sprites.other.showdown.back_default"
              :sprites13="pokemonSelected?.sprites.other.showdown.back_female"
              :sprites14="pokemonSelected?.sprites.other.showdown.back_shiny"
              :sprites15="pokemonSelected?.sprites.other.showdown.front_default"
              :sprites16="pokemonSelected?.sprites.other.showdown.front_female"
              :sprites17="pokemonSelected?.sprites.other.showdown.front_shiny"
              :sprites18="pokemonSelected?.sprites.other.showdown.front_shiny_female"
              :sprites22="pokemonSelected?.sprites.other.showdown.back_shiny_female"
              :ataque="pokemonSelected?.abilities[0].ability.name"
              :ataque2="pokemonSelected?.abilities[1].ability.name"
              :ataque3="pokemonSelected?.abilities[2]?.ability.name ?? ''"
              :version="pokemonSelected?.game_indices[0].version.name"
              :gameindex="pokemonSelected?.game_indices[0].game_index"
              :evo1="evolutionInfo?.chain.species.name"
              :evo2="evolutionInfo?.chain.evolves_to[0].species.name"
              :evo3="evolutionInfo?.chain.evolves_to[0].evolves_to[0].species.name"
              

              


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
