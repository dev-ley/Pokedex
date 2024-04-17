<template>
    <main>
      <!-- Conteúdo existente do seu componente -->
    
      <!-- Botão "Ir para o Topo" -->
      <button @click="scrollToTop" class="btn btn-primary btn-floating">
        ^
      </button>
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
  
  <script setup>
  // Lógica para rolar para o topo da página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Scroll suave
    });
  };

  const goHomePage = () => {
  currentPage.value = 'home'; // Define a página atual como "home"
  updateVisiblePokemons(); // Atualiza os Pokémon exibidos
  SearchPokemonField.value = ''; // Limpa o campo de pesquisa
  noResults.value = false; // Reseta o estado de "noResults"
};
  </script>
    