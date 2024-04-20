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
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src="../assets/favicon.ico" alt="Logo" width="15%"  height="40px" class="d-inline-block align-text-top">
            Pokedex
          </a>
          <div class="m-2">
                  <button @click="setLocale('pt_BR')">Portugues</button>
                  <button @click="setLocale('en')">Inglês</button>
                  <button @click="setLocale('es')">Espanhol</button>
                </div>  
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">{{$t('nav.home')}}</a>
                
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

</style>