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
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(res => res.json())
      .then(res => {
        allPokemons.value = res.results;
        updateVisiblePokemons();
        console.log(allPokemons.value)
        
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

  const searchByType = async (type) => {
   
    let pokemonDetails = null;
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
    
    
    if (pokemonDetails.length === 0) {
      noResults.value = true; // Nenhum Pokémon encontrado
    } else {
      noResults.value = false;
      pokemons.value = pokemonDetails;
    }
  };

/*  const searchByType2 = async (type) => {
    selectedType.value = type; // Atualiza o tipo selecionado
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(data.pokemon.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return {
          name: pokemonData.name,
          url: pokemonData.sprites.front_default
        };
      }));

      pokemonList.value = pokemonDetails;
      pokemons = pokemonList.value;
      // Atualiza a lista de Pokémon com base no tipo selecionado
      console.log(pokemons);
      //allPokemons.value = pokemons;

      noResults.value = false;
      pokemons.value = pokemonDetails;
      
       return pokemons; //return pokemons.value;
    } catch (error) {
      console.error("Erro ao buscar Pokémon por tipo:", error);
    }
    
  };
*/

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
      console.log("Informações da espécie:", speciesData);
      const speciesId = speciesData.evolution_chain.url.split("/").reverse()[1];
      console.log("Nome da ID espécie:", speciesId);

      // Terceiro fetch para obter as informações de evolução do Pokémon
      const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${speciesId}`);
      const evolutionData = await evolutionResponse.json();
      console.log("Informações de evolução:", evolutionData);
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
      <div class="d-flex flex-wrap">

          <button v-for="pokType in pokTypes"
                :key="pokType"
                @click="searchByType(pokType)" 
                class="btn btn-primary m-1">{{ $t(pokType) }}</button>
                  
        
            <!-- <button type="button" @click="searchByType('normal')" class="btn btn-primary m-1">{{ $t('types.normal') }}</button>
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
            <button type="button" @click="searchByType('fairy')" class="btn btn-primary m-1">{{ $t('types.fairy') }}</button> -->
          </div>
          <div class="container">
        <div class="row mt-5 d-flex justify-content-center">
          <div class="col-12 col-sm-12 col-md-12 d-flex flex-column align-items-center">

            <div class="card card-list">
              <div class="card-body row">
                <form @submit="searchPokemon">
                  <label for="SearchPokemonField" class="form-label">Pesquisar</label>
                  <div class="mb-3 d-flex">
                    <input v-model.trim="SearchPokemonField" type="text" class="form-control" id="SearchPokemonField" placeholder="Pesquisar..." >
                    <button type="submit" class="btn btn-primary">Buscar</button>
                  </div>
                </form>

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

      <Topo />       <!-- Modal -->
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
                :version="pokemonSelected?.game_indices[0]?.version.name ?? null"
                :indexArray="pokemonSelected?.game_indices" 
                :gameindex="pokemonSelected?.game_indices[0]?.game_index  ?? null"
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
