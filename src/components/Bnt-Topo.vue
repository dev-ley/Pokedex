<script setup>

const scrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

</script>
  
<template>
    <main>    
      <button @click="scrollToTop" class="btn btn-primary btn-floating">^</button>
    </main>
  </template>
  
<style scoped>
  /* Estilos específicos do botão */
  .btn-floating {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000; /* Garante que o botão esteja acima de outros elementos */
  }
  
  /* Estilos para dispositivos móveis */
  @media (max-width: 576px) {
    .btn-floating {
      bottom: 10px;
      right: 10px;
    }
  }
</style>