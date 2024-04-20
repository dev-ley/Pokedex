<script setup>
    const pokemon = defineProps(["name", "img", "index", "loading", "especie","tipo", "sprites","sprites1","sprites2","sprites3","sprites4","sprites5","sprites6","sprites7","sprites8","sprites9","sprites10","sprites11","sprites12","sprites13","sprites14","sprites15","sprites16","sprites17","sprites18","sprites19","sprites20","sprites21","sprites22", "ataque", "ataque2", "ataque3", "gameindex", "version", "evo1","evo2","evo3"]);
</script>
<template>
    <div class="container d-flex flex-column mb-3">
        <div class="d-flex flex-column mb-3">
            <div class="card cardListPokemon" :class="loading ? '' : 'animate__animated animate__flipInY'">
                <div class="id-icon">
                    <p>N° {{ pokemon.index }}</p>
                    <div class="icon">
                        <img src="../assets/favicon.ico" alt=""><img src="../assets/favicon.ico" alt="">
                    </div>
                </div>
                <img v-if="pokemon.name" class="card-img-top p-5" :src="pokemon.img" alt="Card image cap">
                <img v-else class="img-card card-img-top p-5" src="../assets/pikachu.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-center"> {{ pokemon.name }}</h5>
                    <p>tipo {{ pokemon.tipo }}</p>
                    <p>espécie {{ pokemon.especie }}</p>
                </div>
                <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img :src="pokemon.sprites" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites1" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites2" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites3" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites4" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites5" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites6" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites7" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites12" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites13" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites14" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites15" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites16" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites17" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites18" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites22" alt="">
                        </div>
                        <div class="carousel-item">
                            <img :src="pokemon.sprites21" alt="">
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
                <div>
                    Passe para o Lado
                    <img :src="pokemon.sprites8" alt="">
                    <img :src="pokemon.sprites9" alt="">
                    <img :src="pokemon.sprites10" alt="">
                    <img :src="pokemon.sprites11" alt="">
                    <img :src="pokemon.sprites19" alt="">
                    <img :src="pokemon.sprites20" alt="">
                </div>
            </div>
            <div class="card d-flex">
                <div>
                    <h3>Movimenos de ataque</h3>
                    <p>{{ pokemon.ataque }}</p>
                    <p>{{ pokemon.ataque2 }}</p>
                    <p>{{ pokemon.ataque3 }}</p>
                </div>
                <div>
                    <h3>game index</h3>
                    <p>index {{ pokemon.gameindex }} na versão {{ pokemon.version }}</p>
                </div>
                <div>
                    <h3>Evolução</h3>
                    <div>
                    <p>{{ evo1 }}</p>
                    <p>{{ evo2 }}</p>
                    <p>{{ evo3 }}</p>
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