<script setup>
    const pokemon = defineProps(["name", "img", "index", "loading", "especie","tipo", "sprites","sprites1","sprites2","sprites3","sprites4","sprites5","sprites6","sprites7","sprites8","sprites9","sprites10","sprites11","sprites12","sprites13","sprites14","sprites15","sprites16","sprites17","sprites18","sprites19","sprites20","ataque", "ataque2", "ataque3", "gameindex", "version", "evo1","evo1Img","evo2","evo2Img","evo3","evo3Img", "indexArray"]);

    console.log("AQUIIIII")
    console.log(pokemon.indexArray)
</script>
<template>
    <div class="container d-flex flex-column mb-3">
        <div class="d-flex flex-column mb-3">
            <div class="card cardListPokemon" :class="loading ? '' : 'animate__animated animate__flipInY'">
                <div class="id-icon">
                    <p>ID: {{ pokemon.index }}</p>
                    <div class="icon">
                        <img src="../assets/favicon.ico" alt=""><img src="../assets/favicon.ico" alt="">
                    </div>
                </div>
                <img v-if="pokemon.name" class="card-img-top p-5" :src="pokemon.img" alt="Card image cap">
                <img v-else class="img-card card-img-top p-5" src="../assets/pikachu.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-center">Nome: {{ pokemon.name }}</h5>
                    <p>Tipo: {{ pokemon.tipo }}</p>
                    <p>Espécie:  {{ pokemon.especie }}</p>
                </div>


                <div class="card">
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            <div  v-if="pokemon.sprites != null"    class="carousel-item active">
                                <img :src="pokemon.sprites"     alt="">
                            </div>
                            <div  v-if="pokemon.sprites1 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites1"  alt="">
                            </div>
                            <div  v-if="pokemon.sprites2 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites2"  alt="">
                            </div>

                            <div  v-if="pokemon.sprites3 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites3"   alt="">
                            </div>
                            <div  v-if="pokemon.sprites4 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites4"   alt="">
                            </div>
                            <div  v-if="pokemon.sprites5 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites5"    alt="">
                            </div>
                            <div  v-if="pokemon.sprites6 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites6"    alt="">
                            </div>
                            <div  v-if="pokemon.sprites7 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites7"    alt="">
                            </div>
                            <div  v-if="pokemon.sprites12 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites12" alt="">
                            </div>
                            <div  v-if="pokemon.sprites13 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites13" alt="">
                            </div>
                            <div  v-if="pokemon.sprites14 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites14" alt="">
                            </div>
                            <div  v-if="pokemon.sprites15 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites15" alt="">
                            </div>
                            <div  v-if="pokemon.sprites16 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites16" alt="">
                            </div>
                            <div  v-if="pokemon.sprites17 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites17" alt="">
                            </div>
                            <div  v-if="pokemon.sprites18 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites18" alt="">
                            </div>  
                            <div  v-if="pokemon.sprite19 != null"   class="carousel-item">
                                <img  :src="pokemon.sprites19"  alt="">
                            </div>
                            <div  v-if="pokemon.sprites20 != null"  class="carousel-item">
                                <img   :src="pokemon.sprites20" alt="">
                            </div>

                            <div v-if="pokemon.sprites8 != null"  class="carousel-item active">
                                <img :src="pokemon.sprites8"  alt="">
                            </div>
                            <div v-if="pokemon.sprites9 != null"   class="carousel-item">
                                <img :src="pokemon.sprites9"   alt="">
                            </div>
                            <div v-if="pokemon.sprites10 != null"  class="carousel-item">
                                <img :src="pokemon.sprites10"  alt="">
                            </div>
                            <div v-if="pokemon.sprites11 != null"  class="carousel-item">
                                <img :src="pokemon.sprites11"  alt="">
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>


            </div>
            <div class="card d-flex">
                <div class="card text-center">
                    <ul>Movimenos de ataque</ul>
                    <li v-if="pokemon.ataque">{{ pokemon.ataque }}</li>
                    <li v-if="pokemon.ataque2">{{ pokemon.ataque2 }}</li>
                    <li v-if="pokemon.ataque3">{{ pokemon.ataque3 }}</li>
                </div>
                <div class="card text-center">
                    <h3>game index</h3>
                    <p>index {{ pokemon.gameindex }} na versão {{ pokemon.version }}</p>
                </div>
                <div class="card text-center" >
                    <h3>Evolução</h3>
                    <div class="d-flex ">
                    <p>{{ evo1 }}</p>
                    
                    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo1Img}.png`" alt="">
                    <p>{{ evo2 }}</p>
                    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo2Img}.png`" alt="">
                    <p>{{ evo3 }}</p>
                    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo3Img}.png`" alt="">
                    </div>
                </div>
                        </div>
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

    img {
        width: 100%;
    }
</style>