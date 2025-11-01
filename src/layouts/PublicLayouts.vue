<template>
    <main>
        <!-- Layout Hero (untuk Home/Landing Page) -->
        <div v-if="route.meta.layout === 'hero'">
            <div class="h-screen bg-cover bg-center bg-no-repeat relative">
                <!-- Background Images Carousel -->
                <div v-for="(image, index) in listImages" :key="index"
                    class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                    :style="{ backgroundImage: `url(${image})` }"
                    :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"></div>

                <!-- Glassmorphism Overlay -->
                <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                <div class="relative z-10">
                    <!-- Navbar -->
                    <NavBarComponent></NavBarComponent>

                    <!-- RouterView untuk konten children -->
                    <RouterView />

                    <!-- Footer -->
                    <FooterComponent />
                </div>
            </div>
        </div>

        <div v-else-if="route.meta.layout === 'tentang'">
            <div class="h-[40vh] bg-cover bg-center bg-no-repeat relative"
                :style="{ backgroundImage: `url(${backgroundImage})` }">

                <!-- Glassmorphism Overlay -->
                <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                <div class="relative z-10">
                    <!-- Navbar -->
                    <NavBarComponent></NavBarComponent>

                    <!-- RouterView untuk konten children -->
                    <RouterView />

                    <!-- Footer -->
                    <FooterComponent />
                </div>
            </div>
        </div>

        <!-- Layout Default (untuk halaman lain) -->
        <div v-else>
            <div class="bg-white pt-3">
                <NavBarComponent></NavBarComponent>
            </div>
            <RouterView />
            <FooterComponent />
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import NavBarComponent from '@/components/NavBarComponent.vue';
import FooterComponent from '@/components/public/FooterComponent.vue';

// Import gambar latar belakang
import backgroundImage from '@/assets/makanan.jpg';
import matchaImage from '@/assets/matcha.jpg';
import ramenImage from '@/assets/ramen.jpg';
import sushiImage from '@/assets/sushi.jpg';
import shabuImage from '@/assets/shabu.jpg';

const route = useRoute();

const listImages = [
    backgroundImage,
    matchaImage,
    ramenImage,
    sushiImage,
    shabuImage
];

// State untuk slide yang aktif
const currentSlide = ref(0);
let intervalId = null;

// Fungsi untuk pindah ke slide berikutnya
const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % listImages.length;
};

// Lifecycle hooks
onMounted(() => {
    // Auto slide setiap 5 detik (5000ms)
    // Ubah angka ini untuk mengatur kecepatan pergantian
    intervalId = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
    // Bersihkan interval saat component di-unmount
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>