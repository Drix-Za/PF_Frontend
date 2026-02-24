<template>
  <div class="game-card" @click="goToDetail">
    <div class="card-image-wrapper">
      <img :src="game.imageUrl" :alt="game.titulo" class="card-image" />
      <div class="card-overlay">
        <button class="add-cart-btn">
          <span class="material-icons-outlined">add_shopping_cart</span>
        </button>
      </div>
    </div>
    <div class="card-info">
      <h3 class="game-title">{{ game.titulo }}</h3>
      <div class="card-footer">
        <span class="game-price">{{ game.price }}</span>
        <span class="game-tag">Digital</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const goToDetail = () => {
  // Navegar al detalle del producto según el ID en la bd
  router.push(`/producto/${props.game.id_producto}`);
};
</script>

<style scoped>
.game-card {
  background: var(--surface-light);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--border-light);
}

.dark .game-card {
  background: var(--surface-dark-lighter);
  border-color: rgba(255, 255, 255, 0.05);
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-image-wrapper {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.game-card:hover .card-image {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  opacity: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1rem;
  transition: opacity 0.3s ease;
}

.game-card:hover .card-overlay {
  opacity: 1;
}

.add-cart-btn {
  background: var(--primary);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.card-info {
  padding: 1rem;
}

.game-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-price {
  color: var(--primary);
  font-weight: 700;
}

.game-tag {
  font-size: 0.7rem;
  background: rgba(0,0,0,0.1);
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.dark .game-tag {
  background: rgba(255,255,255,0.1);
}
</style>