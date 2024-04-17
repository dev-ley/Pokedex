<script setup>
    const pokemon = defineProps(["name", "img", "index", "loading", "especie","tipo"]);
</script>

<template>
    <div class="d-flex">
        <div class="card cardListPokemon" :class="loading ? '' : 'animate__animated animate__flipInY'" style="width: 20rem;">
            <div class="id-icon" >
                <p>N° {{ pokemon.index  }}</p>
                <div class="icon" >
                    <img  src="../assets/favicon.ico" alt=""><img src="../assets/favicon.ico" alt="">
                </div>
            </div>
            <img v-if="pokemon.name"
             class="card-img-top p-5"
             :src="pokemon.img"
             alt="Card image cap">
            <img v-else
            class="card-img-top p-5"
            src="../assets/favicon.ico"
            alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-center"> {{ pokemon.name  }}</h5>
                <p>tipo {{ pokemon.tipo }}</p>
                <p>espécie {{ pokemon.especie }}</p>
            </div>
        </div>

        <div>
               
        </div>
    </div>

    

    
</template>

<style>
 .id-icon {
    display: flex;
    justify-content: space-between;
 }

 .icon > img{
    width: 50px;
    height: 50px;
 }

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