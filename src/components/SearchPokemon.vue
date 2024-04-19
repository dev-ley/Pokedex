  <script setup>
import { ref, onMounted } from 'vue';

const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
  
  // Variáveis reativas para armazenar dados do formulário e resultados da busca
  const searchField = ref(""); // Para pesquisa por nome
  const pokemonData = ref(null); // Para armazenar os dados do Pokémon encontrado
  const pokemonList = ref([]); // Variável reativa para armazenar a lista de Pokémon
  

  
  // Função para realizar a busca por nome de Pokémon na Pokédex
  const searchPokemon = async () => {
  const searchText = searchField.value.trim().toLowerCase();
  if (searchText !== '') {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`);
      const data = await response.json();
      pokemonData.value = data;
      console.log("Pokémon encontrado:", pokemonData.value);
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    }
  } else {
    console.log("Campo de busca vazio.");
  }
};

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
  let nextUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  try {
    // Realizar chamadas sequenciais até não haver mais resultados
    while (nextUrl) {
      const response = await fetch(nextUrl);
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
      nextUrl = data.next;
    }
    pokemonList.value = allPokemon;
    console.log("Todos os Pokémon:", pokemonList.value);
  } catch (error) {
    console.error("Erro ao buscar todos os Pokémon:", error);
  }
};

// Ao montar o componente, buscar todos os Pokémon da API
onMounted(async () => {
  await fetchAllPokemon();
});
  
  </script>
<template>
    <div>

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
        <div class="mb-3 d-flex">
          <input v-model.trim="searchField" type="text" class="form-control" id="SearchPokemonField" placeholder="Pesquisar por nome..." required>
          <button type="submit" class="btn btn-primary">Buscar</button>
        </div>
        
        <div class="d-flex flex-wrap">
          <button type="button" @click="searchByType('normal')" class="btn btn-primary m-1">Normal</button>
          <button type="button" @click="searchByType('fire')" class="btn btn-primary m-1">Fogo</button>
          <button type="button" @click="searchByType('water')" class="btn btn-primary m-1">Água</button>
          <button type="button" @click="searchByType('electric')" class="btn btn-primary m-1">Elétrico</button>
          <button type="button" @click="searchByType('grass')" class="btn btn-primary m-1">Grama</button>
          <button type="button" @click="searchByType('ice')" class="btn btn-primary m-1">Gelo</button>
          <button type="button" @click="searchByType('fighting')" class="btn btn-primary m-1">Lutador</button>
          <button type="button" @click="searchByType('poison')" class="btn btn-primary m-1">Veneno</button>
          <button type="button" @click="searchByType('ground')" class="btn btn-primary m-1">Terra</button>
          <button type="button" @click="searchByType('flying')" class="btn btn-primary m-1">Voador</button>
          <button type="button" @click="searchByType('psychic')" class="btn btn-primary m-1">Psíquico</button>
          <button type="button" @click="searchByType('bug')" class="btn btn-primary m-1">Inseto</button>
          <button type="button" @click="searchByType('rock')" class="btn btn-primary m-1">Pedra</button>
          <button type="button" @click="searchByType('ghost')" class="btn btn-primary m-1">Fantasma</button>
          <button type="button" @click="searchByType('dark')" class="btn btn-primary m-1">Sombrio</button>
          <button type="button" @click="searchByType('steel')" class="btn btn-primary m-1">Aço</button>
          <button type="button" @click="searchByType('dragon')" class="btn btn-primary m-1">Dragão</button>
          <button type="button" @click="searchByType('fairy')" class="btn btn-primary m-1">Fada</button>
        </div>
      </form>
    <div>

    <!-- Lista de Pokémon -->
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 mb-3" v-for="(pokemon, index) in pokemonList" :key="index">
        <div class="card">
          <img :src="pokemon.image" class="card-img-top" alt="Imagem do Pokémon">
          <div class="card-body text-center">
            <h5 class="card-title">{{ capitalizeFirstLetter(pokemon.name) }}</h5>
          </div>
        </div>
      </div>
    </div>
    <p v-if="pokemonList.length === 0">Carregando...</p>


    <!-- Lista de Pokémon -->
    
  </div>
    

    </div>

  </template>
  
  
  <style>
  /* Estilos específicos, se necessário */
  </style>
  