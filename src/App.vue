<script setup>
  import Nav from "../src/components/Nav.vue"
  import Footer from "../src/components/Footer.vue"
</script>

<template>

  <Nav />
  
  <div class="main">
    <router-view></router-view>
  </div>

  <Footer />

</template>

<style>


  
</style>
