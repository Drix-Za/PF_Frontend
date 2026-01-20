<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router'; // Necesario para la navegación

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink 
    :to="{ name: 'product-detail', params: { slug: game.slug } }"
    class="game-card-link-wrapper"
  >
    <div class="game-card">
      <div class="card-image-wrapper">
        <img :alt="game.title" class="card-image" :src="game.imageUrl"/>
        <div v-if="game.discount" class="discount-badge">{{ game.discount }}</div>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ game.title }}</h3>
        <div class="card-price-group">
          <span v-if="game.oldPrice" class="old-price">{{ game.oldPrice }}</span>
          <span class="current-price">{{ game.price }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

.game-card-link-wrapper {
  text-decoration: none; /* Quita el subrayado de los enlaces */
  display: block;
}

.dark {
    /* Dark Mode */
    --surface-dark: #0B1021;
    --text-light: #F3F4F6; /* gray-100 */
    --text-secondary-dark: #D1D5DB; /* gray-300 */
    --green-dark: #4ADE80; /* green-400 */
}

.game-card {
    /* group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1 */
    background-color: var(--surface-light);
    border-radius: 0.75rem; /* rounded-xl */
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* shadow-lg */
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);
}

.dark .game-card {
    background-color: var(--surface-dark);
}

.game-card:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(37, 99, 235, 0.1); /* hover:shadow-xl hover:shadow-primary/10 */
    transform: translateY(-4px); /* hover:-translate-y-1 (approx) */
}

.card-image-wrapper {
    /* relative aspect-[3/4] overflow-hidden */
    position: relative;
    overflow: hidden;
    /* aspect-ratio: 3 / 4; */
    padding-top: 133.3333%; /* Para simular aspect-ratio 3/4 */
}
.card-image {
    /* object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 500ms ease-in-out;
}
.game-card:hover .card-image {
    transform: scale(1.1); /* group-hover:scale-110 */
}

.card-discount-tag {
    /* absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded */
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: white;
    font-size: 0.75rem; /* text-xs */
    font-weight: 700; /* font-bold */
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    z-index: 10;
}
.bg-primary {
    background-color: var(--primary);
}
.bg-green {
    background-color: var(--green);
}

.card-content {
    padding: 1rem; /* p-4 */
}
.card-title {
    /* text-gray-900 dark:text-white font-semibold truncate */
    color: var(--text-dark);
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.dark .card-title {
    color: white;
}

.card-price-info {
    /* flex items-center gap-2 mt-1 */
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
}
.card-price-old {
    /* text-gray-400 text-xs line-through */
    color: var(--text-light-gray);
    font-size: 0.75rem;
    text-decoration: line-through;
}
.card-price-current {
    /* text-gray-600 dark:text-gray-300 text-sm */
    color: var(--text-medium);
    font-size: 0.875rem; /* text-sm */
}
.dark .card-price-current {
    color: var(--text-secondary-dark);
}
.text-green {
    color: var(--green);
}
.dark .text-green {
    color: var(--green-dark);
}
.bold {
    font-weight: 700;
}
</style>