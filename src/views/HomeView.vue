<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import ListPokemons from '../components/ListPokemons.vue';
import CardPokemonSelected from '../components/CardPokemonSelected.vue';
import Topo from '../components/Topo.vue'

let urlBaseSvg = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/");
let pokemons = reactive(ref([]));
let SearchPokemonField = ref("");
let pokemonSelected = reactive(ref());
let loading = ref(false);
let offset = ref(20); // Quantidade de Pokémons a serem carregados a cada vez

onMounted(() => {
  fetchPokemonData();

  // Configuração do Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMorePokemons();
    }
  }, { threshold: 0.5 }); // Define o ponto de interseção como 50% do elemento visível
  observer.observe(document.querySelector('.load-more-trigger'));
});

const fetchPokemonData = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${offset.value}&offset=0`);
  const data = await response.json();
  pokemons.value = data.results;
};

const loadMorePokemons = async () => {
  loading.value = true;
  offset.value += 20; // Incrementa o offset para carregar mais 20 Pokémons
  await fetchPokemonData();
  loading.value = false;
};

const pokemonsFiltered = computed(() => {
  if (!pokemons.value) return [];

  const filterText = SearchPokemonField.value.toLowerCase();
  return pokemons.value.filter(pokemon => {
    const nameMatches = pokemon.name.toLowerCase().includes(filterText);
    const idMatches = pokemon.url.split("/")[6].includes(filterText);
    return nameMatches || idMatches;
  });
});

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
    <Topo />
    <div class="container">
      <div class="row mt-5 d-flex justify-content-center">
        <div class="col-12 col-sm-12 col-md-12 d-flex flex-column align-items-center">
          <CardPokemonSelected
            :name="pokemonSelected?.name"
            :loading="loading"
            :index="pokemonSelected?.id"
            :especie="pokemonSelected?.types[0]?.type.name"
            :tipo="pokemonSelected?.types.length > 1 ? pokemonSelected?.types[1]?.type.name : pokemonSelected?.types[0]?.type.name"
            :img="pokemonSelected?.sprites.other.dream_world.front_default"
          />

          <div class="card card-list">
            <div class="card-body row">
              <div class="mb-3">
                <label hidden for="SearchPokemonField" class="form-label">Pesquisar</label>
                <input v-model="SearchPokemonField"
                  type="text"
                  class="form-control"
                  id="SearchPokemonField"
                  placeholder="Pesquisar..."
                />
              </div>

              <ListPokemons
                v-for="pokemon in pokemonsFiltered"
                :key="pokemon.name"
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
  </main>
</template>

<style scoped>
/* Estilos específicos do componente */
.load-more-trigger {
  height: 10px; /* Altura mínima para o Intersection Observer */
}
</style>