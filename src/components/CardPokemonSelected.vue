<script setup>
    const pokemon = defineProps(["name", "img", "index", "loading", "especie","tipo", "peso", "altura", "status", "statusInfo"]);

</script>

<template>
    <div class="d-flex flex-column ">
        <div class="d-flex justify-content-center">
            <div class="card cardListPokemon" :class="loading ? '' : 'animate__animated animate__flipInY'" style="width: 20rem;">
                <div class="id-icon" >
                    <strong>N° {{ pokemon.index  }}</strong>
                    <div class="icon" >
                        <img  src="../assets/favicon.ico" alt=""><img src="../assets/favicon.ico" alt="">
                    </div>
                </div>
                <img v-if="pokemon.name"
                 class="card-img-top p-5"
                 :src="pokemon.img"
                 alt="Card image cap">
                <img v-else
                class="img-card card-img-top p-5"
                src="../assets/pikachu.png"
                alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-center"> {{ pokemon.name  }}</h5>

                    <div class="d-flex justify-content-around ">
                        <div>
                            <p>tipo {{ pokemon.tipo }}</p>
                            <p>espécie {{ pokemon.especie }}</p>
                        </div>
                        <div>
                            <p>peso {{ pokemon.peso }}</p>
                            <p>altura {{ pokemon.altura }}</p>
                        </div>

                    </div>

                    <div>
                        {{ pokemon.status }} e {{ pokemon.statusInfo }}
                    </div>
            
                </div>
        </div>
        </div>

        <div class="card mt-4">
                <h3 class="About">Sobre</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ex corporis officia nulla culpa itaque quisquam! Natus autem id expedita commodi molestias inventore est ex atque, deleniti amet, vero laborum.</p>

        </div>
        <div class="card mt-4">
                <ul>
                    <li>oi</li>
                    <li>oi</li>
                    <li>oi</li>
                </ul>
        </div>
        <div class="card mt-4">
                Evoluções
                <div>1</div>
                <div>2</div>
                <div>3</div>
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

    .img-card {
        width: 100%;
        border-radius:80px;
    }
</style>