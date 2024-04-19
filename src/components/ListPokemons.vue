<script setup>
import { computed } from 'vue';
const pokemon = defineProps(["name", "urlBaseSvg", "index"])
const formattedName = computed(() => {
return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
});
    
</script>

<template>
    <div class="col-6 col-sm-4 col-lg-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div class="card p-2x mb-3 cardListPokemon">
            <div class="id-icon" >
            <p>{{ pokemon.index }}</p>
            <div class="icon" >
            <img src="../assets/favicon.ico" alt=""><img src="../assets/favicon.ico" alt="">
        </div>
        </div>
            <img :src="urlBaseSvg" class="card-img-top" alt="">
            <strong class="text-center">{{ formattedName }}</strong> 
        </div>
    </div>
</template>

<style scoped>
    .cardListPokemon {
        background: rgb(238,174,202);
        background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(118,242,239,0.5) 100%);
        cursor: pointer;
    }
    .cardListPokemon:hover {
        background: rgb(238,174,202);
        background: radial-gradient(circle, rgba(238,174,202,9) 10%, rgba(118,242,239,7) 100%);
        cursor: pointer;
    }
    .cardListPokemon img:hover {
        padding: 0.1rem;
    }
</style>