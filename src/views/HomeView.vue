<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';
import CardPokemonSelected from '../components/CardPokemonSelected.vue';
import Topo from '../components/Topo.vue';


let urlBaseSvg = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/");
let allPokemons = reactive(ref([]));
let pokemons = ref([]);
let SearchPokemonField = ref("");
let pokemonSelected = reactive(ref());
let loading = ref(false);
let noResults = ref(false); // Variável para controlar se não houve resultados na pesquisa
const limitToShow = 20; // Limite de Pokémon a serem exibidos por página
let observeIntersection = true;

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
  await fetch(pokemon.url)
    .then(res => res.json())
    .then(res => pokemonSelected.value = res)
    .catch(err => alert(err))
    .finally(() => {
      loading.value = false;
    });
};

</script>

<template>
  <main>
    <div class="container">
      <div class="row mt-5 d-flex justify-content-center">
        <div class="col-12 col-sm-12 col-md-12 d-flex flex-column align-items-center">
          <CardPokemonSelected 
            :name="pokemonSelected?.name"
            :loading="loading"
            :index="pokemonSelected?.id"
            :especie="pokemonSelected?.types[0].type.name"
            :tipo="pokemonSelected?.types.length > 1 ? pokemonSelected?.types[1].type.name : pokemonSelected?.types[0].type.name"
            :img="pokemonSelected?.sprites.other.dream_world.front_default"
          />

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

    <Topo /> 
  </main>
</template>

<style scoped>
/* Estilos específicos do componente */
.load-more-trigger {
  height: 10px; /* Altura mínima para o Intersection Observer */
}
</style>
