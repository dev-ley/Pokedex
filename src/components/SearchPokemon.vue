  <script setup>
import { ref, onMounted, computed } from 'vue';
import Modal from "./Modal.vue"
//IDIOMAS //



const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
  
  // Variáveis reativas para armazenar dados do formulário e resultados da busca
  const pokemonData = ref(null); // Para armazenar os dados do Pokémon encontrado
  const pokemonList = ref([]); // Variável reativa para armazenar a lista de Pokémon
  const searchText = ref(""); // Texto da barra de busca

  
  const filteredPokemonList = computed(() => {
  const searchQuery = searchText.value.trim().toLowerCase();
  return pokemonList.value.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchQuery);

  });
});
  
  // Função para realizar a busca por nome de Pokémon na Pokédex

  // Função para realizar a busca por tipo de Pokémon na Pokédex
  const searchByType = async (type) => {
  if (type !== '') {
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
      pokemonList.value = pokemonDetails;
      console.log(pokemonList.value);
    } catch (error) {
      console.error("Erro ao buscar Pokémon por tipo:", error);
    }
  } else {
    console.log("Tipo de Pokémon inválido.");
  }
};

  
const fetchAllPokemon = async () => {
  const allPokemon = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1400';
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Buscar detalhes de cada Pokémon para obter a imagem
    const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return {
        name: capitalizeFirstLetter(pokemonData.name),
        image: pokemonData.sprites.front_default
      };
    }));

    allPokemon.push(...pokemonDetails);
    pokemonList.value = allPokemon;
    console.log("Primeiros 10 Pokémon:", pokemonList.value);
  } catch (error) {
    console.error("Erro ao buscar os primeiros 10 Pokémon:", error);
  }
};

// Ao montar o componente, buscar os primeiros 10 Pokémon da API
onMounted(async () => {
  await fetchAllPokemon();
});

  </script>
<template>

        <!-- Exibir informações do Pokémon buscado-->
      <div v-if="pokemonData" class="mt-4">
        <h3>{{ pokemonData.name }}</h3>
        <img :src="pokemonData.sprites.front_default" alt="Imagem do Pokémon">
        <div>
          <strong>Altura:</strong> {{ pokemonData.height }}
        </div>
        <div>
          <strong>Peso:</strong> {{ pokemonData.weight }}
        </div>
        <div>
          <strong>Tipo(s):</strong>
          <span v-for="(type, index) in pokemonData.types" :key="index">{{ type.type.name }}</span>
        </div>
        <!-- Adicione mais informações conforme necessário -->
      </div>

      <form class="border border-primary rounded-3 mt-5 p-2" @submit.prevent="searchPokemon">
      
          <div class="mb-3">
            <label for="searchPokemon">Filtrar por nome:</label>
            <input v-model.trim="searchText" type="text" class="form-control" id="searchPokemon" placeholder="Digite o nome do Pokémon">
          </div>
        
        <div class="d-flex flex-wrap">
          <button type="button" @click="fetchAllPokemon()" class="btn btn-primary m-1">{{ $t('types.todos') }}</button>
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
      </form>
    <div>

    <!-- Lista de Pokémon -->
  <div>
    <!-- Barra de busca para filtrar os Pokémon -->
 
    <Modal/>

    <!-- Lista de Pokémon filtrada -->
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 mb-3" v-for="(pokemon, index) in filteredPokemonList" 
      :key="index"
      
      
      >
        <div class="card"  data-bs-toggle="modal" data-bs-target="#exampleModal">
          <img :src="pokemon.image" class="card-img-top" alt="Imagem do Pokémon">
          <div class="card-body text-center">
            <h5 class="card-title">{{ capitalizeFirstLetter(pokemon.name) }}</h5>
          </div>
        </div>
      </div>
    </div>
    <p v-if="filteredPokemonList.length === 0">Nenhum Pokémon encontrado.</p>
  </div>

    <!-- Lista de Pokémon -->
    
  </div>
    

  </template>
  
  
  <style>
  /* Estilos específicos, se necessário */
  </style>
  