<script setup>

import PainelHome from '../components/PainelHome.vue'
import SearchPokemon from '../components/SearchPokemon.vue'
import Topo from '../components/Topo.vue'

</script>

<template>
  <main>

    <PainelHome />
    <SearchPokemon />
     <div class="container d-flex"></div>
    <Topo /> 
    
  </main>
</template>

<style scoped>

</style>


















  <!-- Modal -->
<!--    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-xl" >
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
        :peso="pokemonSelected?.weight"
        :altura="pokemonSelected?.height"
        />
    </div>

    <div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>-->
