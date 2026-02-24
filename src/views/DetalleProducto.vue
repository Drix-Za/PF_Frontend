<template>
  <div class="app-body dark">
    <main class="main-content-wrapper" v-if="game">
      <button @click="$router.push('/')" class="back-btn">
        <span class="material-icons-outlined">arrow_back</span> Volver a la Store
      </button>

      <div class="product-grid">
        <div class="image-container">
          <img :src="`https://picsum.photos/seed/${game.id_producto}/600/800`" class="main-img" />
        </div>

        <div class="info-container">
          <span class="category-badge">Videojuego Digital</span>
          <h1 class="game-title-detail">{{ game.titulo }}</h1>
          
          <div class="price-section">
            <span class="price-value">$59.99</span>
            <span class="stock-status">En Stock</span>
          </div>

          <p class="description">
            {{ game.descripcion || 'Embárcate en una aventura épica con NeoGaming. Este título ofrece gráficos de última generación y una jugabilidad inmersiva que redefine el género.' }}
          </p>

          <div class="specs">
            <div class="spec-item">
              <span class="material-icons-outlined">language</span>
              <span>Global / Español</span>
            </div>
            <div class="spec-item">
              <span class="material-icons-outlined">verified</span>
              <span>Licencia Permanente</span>
            </div>
          </div>

          <button class="buy-button">
            <span class="material-icons-outlined">shopping_cart</span>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </main>
    
    <div v-else class="loading-state">
      <div class="logo-spinner"></div>
      <p>Buscando juego en la base de datos...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const game = ref(null);

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await fetch('http://localhost:3000/api/productos');
    const data = await response.json();
    // Buscamos el juego específico por ID
    game.value = data.find(item => item.id_producto == id);
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>

<style scoped>
.back-btn {
  background: none; border: none; color: var(--primary);
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  font-weight: 600; margin-bottom: 2rem;
}

.product-grid {
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem;
  background: var(--surface-dark-lighter); padding: 3rem;
  border-radius: 24px; border: 1px solid rgba(255,255,255,0.05);
}

.main-img {
  width: 100%; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.category-badge {
  color: var(--primary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
}

.game-title-detail {
  font-size: 3rem; font-weight: 800; margin: 1rem 0; color: white;
}

.price-section {
  display: flex; align-items: center; gap: 20px; margin-bottom: 2rem;
}

.price-value { font-size: 2.5rem; font-weight: 800; color: #4ade80; }

.description {
  font-size: 1.1rem; line-height: 1.6; color: #9ca3af; margin-bottom: 2rem;
}

.specs { display: flex; gap: 20px; margin-bottom: 2rem; }
.spec-item { 
  display: flex; align-items: center; gap: 8px; 
  background: rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 8px;
  font-size: 0.9rem;
}

.buy-button {
  width: 100%; background: var(--primary); color: white; border: none;
  padding: 1.2rem; border-radius: 12px; font-size: 1.2rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  cursor: pointer; transition: transform 0.2s;
}

.buy-button:hover { transform: scale(1.02); background: var(--primary-hover); }

@media (max-width: 900px) {
  .product-grid { grid-template-columns: 1fr; }
}
</style>