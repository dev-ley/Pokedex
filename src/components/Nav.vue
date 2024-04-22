<script >

export default {
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    }
  }

}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary ">
        <div class="container-fluid">
          <div class=" d-flex align-items-center">
            <a class="navbar-brand " href="/"> <img src="../assets/logo.png" alt="Logo"  height="40px" class="">Pokedex</a>
            <div class="m-2 d-flex" >
              <div class="bandeira d-flex">
                <img src="../assets/br.png" alt="Logo"   class="" @click="setLocale('pt_BR')">
                <img src="../assets/eua.png" alt="Logo"   class="" @click="setLocale('en')">
                <img src="../assets/es.png" alt="Logo"   class="" @click="setLocale('es')">
              </div>

            </div>
            
            
          </div>  
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                
              </li>
              <li class="nav-item">
           
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
</template>

<style>
.bandeira {
  display: flex;
  gap: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.bandeira > img {

  width: 100%;
  border-radius: 50%;

}
</style>