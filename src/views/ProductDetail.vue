<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router'; // useRoute es para leer el slug de la URL

const route = useRoute(); // Instancia de la ruta actual
const gameSlug = ref(route.params.slug); // Obtener el 'slug' dinámico (ej: 'cyber-warrior-x')

// --- Data de EJEMPLO (Simulando una base de datos) ---
// Usaremos esta data para mostrar el juego 'Cyber-Warrior X' por defecto 
// o si el slug coincide. DEBERÍAS expandir esto con tus otros juegos.
const gamesData = {
    'cyber-warrior-x': {
        title: 'Cyber-Warrior X',
        description: 'Cyber-Warrior X is an immersive action-RPG set in the dystopian metropolis of Neo-Kyoto. As a rogue cybernetically enhanced warrior, you\'ll navigate a world of corporate espionage, advanced technology, and moral ambiguity.',
        developer: 'Quantum Leap',
        publisher: 'Galaxy Games',
        releaseDate: 'Oct 26, 2023',
        price: 49.99,
        oldPrice: 59.99,
        genre: ['Action', 'RPG', 'Cyberpunk'],
        mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0B3a3_eP57WjtrwwzZ9Q888HIIQEhk32rlqKu0FGpJCNU3wulPIMrmw23TXS3mW3z4kPzCN4ogbsJ-SJHbS1Db2c2Wsz0DZD7iwKuS1AE_PiDSdrz1gZz1fMp3zReBt9DTxryECw0UYh6MiG9wlKqbJAObIiiWCPssXf29S2p-FPVqsDHoT38f-3tdT0lgTFOxtBdhXwtwmNEv3Yf1dVdvN9ITeRtUp00qiPBAWqtHGYNFuoe4h51A1F_oY535wS_s8Qw4DAGts8',
        thumbnails: [
            { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeNVpGFEbVFPD3JYLY4cWgDO4iTBn3JhnQx3pDCQNWC4-7RWgRSF0fjprYch5CCjc6Bw3zIBGjQmfRQLi3PumGXTi3HAvEGuCPvdFPDnuZTLBusFkS6iAVzuBDOgxMKL3xHpI_G94X8UGN6LAv-pqLAOFkPcEnzGkqSQyIpZNUgi12HHhf-mT1pDlvqUaQPzsZua4EQv9dEU8pinh6VzBeg3E-hSrdS77JekbtMFtoe9PByy3x-30WFdAaYP9dHmsUQnWNTuhtHF4', isVideo: true },
            { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxuaNV8avL9fGyfpkwGfs5pQPuxsW5pHbLqJg9Ugpb6R5F0QI-_bVdr3omc5ShhZl4J-e0Y0YHXUK6cZ5UyVYbj_ElALLMw15nxlr5gSurZ3VnIOOmO_brg5WsaPk9aMDQbqyG3x4GpsvGdeyvpesfZbALsig65b9hjIciUYe8EWqfum0Ip0ZVlfWg0HP7eEJd7RtzzMUiUFmo8gzkZHs2_T4TAl4X1ohHyrzNWVCu7ocRydO9i8o4gL1pdNI0cTiSutWki4kmbPc', isVideo: false },
            { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrqerXEdpC-WeRayiSIBvmMCfyuSNip9PARtubmhhfCnHWeoTo61TIakAO4iEhDxaYldkiCiOYglKHw7I-qBCngTfs_iOVfxMH40W3snCTBOnhUs71e6tXWM0V9MkimJ3oF3xhVu-TBohMn68dXPXI7DEPS4iMVc0jH5RRocj_yrmSVKZw_QJVBEY6p1mGlZM5s0xKViaxGxLHbqmgiSmj3vrdCaoQOWlELJroh6aeZBvu1yL8RGgQPXZMISxCpzltUjFIbNL0yXU', isVideo: false },
            { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZVU3Tl_fJhqQVAUq3QohdD3NPmRzUcOuygwH2cuYHWTj9dVa1eXtVZ4099wnRDBe0IQ_qO2dpZLqYv6nyEk4NvEjhg9jR3x18nqt8DG0tl-zl0q8ewAFfyutiUoZXrtt6hnXPAjq7X9sMspGwnPizctpKOrJYwx6UMWCEMrEMHMOOk7OKi87_ZIr2wihK45xswzlDxNPHkEdvwiPCrawGabdEs1GO_yVKJY2UEe7Grtes80I2jQLFytfZLRal1lc1bXWU7e5Adks', isVideo: false },
        ],
        reviews: [
            { user: 'CyberGamer2077', rating: 4, comment: '"An absolute masterpiece of the cyberpunk genre. The story is compelling, the combat is fluid, and Neo-Kyoto is a breathtaking city to explore. A must-play for any RPG fan!"', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu47zE27F7RHv3uS1RGRkmMWLCXVDhaOuM87eRDL3kqw-x5a6kZbvLiUHi0NpSWBMptgLBkKIQatcYs7Rj1EdqfPgOADkmEpqUErf_aH8hyhv3WNwgiUt9AiQWi0fTp0rnvT9TaVZTs6l6gzUoV4l7r7WIykw99SRYhHk7pUoWYaTGI0xHw8t0838Cwv-Tu2IMTMibPzjx-FodMLMempp6GhKqIYnTvqQ3d02GTU56Zj1QegQOqMpihw1Jj1-4NDBiIzbfplDpVoY' },
            { user: 'PixelPrincess', rating: 5, comment: '"I\'ve sunk over 100 hours into this game and I\'m still finding new things. The level of detail is incredible. The developers poured their hearts into this project and it shows."', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZWdfRx1icMFEdwJxkIKS38zOkZIj_dny2-2FgiJNzPbpY8miS1yUvSKSbErwLCxa3IQSFrCkJJwAFfct3fZof59L6v5Yucx_njHDB5WNOGoAfzbr1Cr0iYMaqrXJbxJ5kXUEV4jsQNeWb7xuMoh3uY1Tp0Wwu7VNfGdlwA36miSDfqfxMwqh9IQOETxaZ5IIc6W2QI3Qp8dCskNCFFV2O-qZ9J_b3Z9Y9lOMK8umIH-EIuhqoloVq4S02d8AbBf3io2cQ4tQuNBw' },
        ],
    },
    // Si agregas más juegos en HomePage.vue, ¡debes agregarlos aquí también!
    // 'neon-racers': { title: 'Neon Racers', ... otros datos ... },
};

const game = ref({}); // Objeto reactivo para la data del juego actual
const isDark = ref(true); 

onMounted(() => {
    // Intentamos cargar los datos del juego usando el slug de la URL
    const loadedGame = gamesData[gameSlug.value.toLowerCase()]; 
    
    if (loadedGame) {
        game.value = loadedGame;
    } else {
        // En caso de que el slug no exista en 'gamesData'
        game.value = { 
            title: `Juego No Encontrado (${gameSlug.value})`, 
            description: 'La información para este juego no está disponible.', 
            developer: 'N/A', 
            publisher: 'N/A', 
            releaseDate: 'N/A', 
            price: 'FREE', 
            oldPrice: null,
            genre: ['Error'],
            mainImage: 'https://via.placeholder.com/1280x720.png?text=Not+Found',
            thumbnails: [],
            reviews: [],
        };
    }
    
    // Inicializa el modo oscuro en el <html>
    document.documentElement.classList.add('dark');
});

// Función para generar las estrellas de rating (Reutilizada del original)
const getRatingStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? 'star' : 'star_border');
  }
  return stars;
};
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-200">
    
    <header class="bg-white dark:bg-[#050B20] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <RouterLink to="/" class="flex-shrink-0 flex items-center gap-2">
              <div class="w-8 h-8 bg-primary rounded-br-lg rounded-tl-lg"></div>
              <span class="font-bold text-xl tracking-tight dark:text-white">GameStore</span>
            </RouterLink>
            <nav class="hidden md:flex space-x-6">
              <RouterLink to="/" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white text-sm font-medium">Store</RouterLink>
              <a class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white text-sm font-medium" href="#">Library</a>
              <a class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white text-sm font-medium" href="#">Community</a>
              <a class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white text-sm font-medium" href="#">Support</a>
            </nav>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative hidden sm:block">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="material-icons text-gray-400 text-lg">search</span>
              </div>
              <input class="bg-gray-100 dark:bg-[#111827] border-none text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-64 pl-10 p-2.5 placeholder-gray-500 dark:placeholder-gray-400" placeholder="Search" type="text"/>
            </div>
            <button class="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span class="material-icons">shopping_cart</span>
            </button>
            <button class="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span class="material-icons">notifications</span>
            </button>
            <button class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
              <span class="material-icons text-gray-400 text-xl">person</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      
      <nav class="flex text-sm text-gray-500 dark:text-gray-400 mb-6">
        <ol class="flex items-center space-x-2">
          <li><RouterLink to="/" class="hover:text-primary">Store</RouterLink></li>
          <li><span class="mx-1">/</span></li>
          <li><a class="hover:text-primary" href="#">Action</a></li>
          <li><span class="mx-1">/</span></li>
          <li class="text-gray-900 dark:text-white font-medium">{{ game.title }}</li>
        </ol>
      </nav>

      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">{{ game.title }}</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 space-y-4">
          <div class="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg relative group">
            <img :alt="`${game.title} Gameplay - Main`" class="w-full h-full object-cover" :src="game.mainImage"/>
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <button v-for="(thumb, index) in game.thumbnails" :key="index"
              :class="[
                'aspect-video rounded-lg overflow-hidden relative transition-all',
                index === 0 ? 'border-2 border-primary ring-2 ring-primary/50' : 'border border-transparent hover:border-primary'
              ]">
              <img :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity" :src="thumb.src"/>
              <div v-if="thumb.isVideo" class="absolute inset-0 flex items-center justify-center bg-black/40">
                <span class="material-icons text-white">play_circle_outline</span>
              </div>
            </button>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-[#0F172A] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 sticky top-24">
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{{ game.description }}</p>
            
            <div class="space-y-3 text-sm mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">Developer:</span>
                <span class="text-primary hover:underline cursor-pointer font-medium">{{ game.developer }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">Publisher:</span>
                <span class="text-primary hover:underline cursor-pointer font-medium">{{ game.publisher }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">Release Date:</span>
                <span class="text-gray-900 dark:text-gray-200">{{ game.releaseDate }}</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-8">
              <span v-for="tag in game.genre" :key="tag" 
                class="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-blue-300 text-xs font-medium">
                {{ tag }}
              </span>
            </div>
            
            <div class="flex items-baseline gap-3 mb-6">
              <span v-if="game.oldPrice" class="text-sm text-gray-400 line-through">Price: ${{ game.oldPrice.toFixed(2) }}</span>
              <span class="text-3xl font-bold text-primary">${{ typeof game.price === 'number' ? game.price.toFixed(2) : game.price }}</span>
            </div>
            
            <button class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/30">
              <span class="material-icons text-xl">shopping_cart</span>
              Add to Cart
            </button>
            <button class="w-full mt-3 bg-gray-100 dark:bg-[#1E293B] hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <span class="material-icons text-xl">favorite_border</span>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      
      <div class="mt-12">
        <div class="border-b border-gray-200 dark:border-gray-800">
          <nav aria-label="Tabs" class="-mb-px flex space-x-8">
            <a class="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#">Reviews</a>
            <a class="border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#">System Requirements</a>
            <a class="border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#">DLCs</a>
          </nav>
        </div>

        <div class="mt-8">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Community Reviews</h3>
          <div class="space-y-4">
            
            <div v-for="(review, index) in game.reviews" :key="index"
              class="bg-white dark:bg-[#0F172A] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <img :alt="review.user" class="h-10 w-10 rounded-full object-cover border-2 border-primary/20" :src="review.avatar"/>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="text-sm font-bold text-gray-900 dark:text-white">{{ review.user }}</h4>
                    <div class="flex text-yellow-400 text-sm">
                      <span v-for="(star, sIndex) in getRatingStars(review.rating)" :key="sIndex"
                        :class="['material-icons text-base', star === 'star' ? '' : 'text-gray-300 dark:text-gray-600']">
                        {{ star }}
                      </span>
                    </div>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ review.comment }}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
    
    <footer class="bg-white dark:bg-[#050B20] border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1">
            <RouterLink to="/" class="flex items-center gap-2 mb-4">
              <div class="w-6 h-6 bg-primary rounded-br-md rounded-tl-md"></div>
              <span class="font-bold text-lg text-gray-900 dark:text-white">GameStore</span>
            </RouterLink>
            <p class="text-sm text-gray-500 dark:text-gray-400">Your one-stop destination for the latest games, reviews, and community discussions.</p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Resources</h3>
            <ul class="space-y-3">
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">About</a></li>
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">Github</a></li>
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Follow Us</h3>
            <ul class="space-y-3">
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">Discord</a></li>
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">Twitter</a></li>
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul class="space-y-3">
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">Privacy Policy</a></li>
              <li><a class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p class="text-sm text-gray-400 dark:text-gray-500">© 2023 GameStore™. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

/* Aseguramos que el material icons use la fuente correcta (opcional si ya está global) */
.material-icons, .material-icons-outlined {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}
</style>