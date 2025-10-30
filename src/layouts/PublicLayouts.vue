<template>
    <main>
        <!-- Layout Hero (untuk Home/Landing Page) -->
        <div v-if="route.meta.layout === 'hero'">
            <div class="h-screen bg-cover bg-center bg-no-repeat relative"
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
import { useRoute } from 'vue-router';
import NavBarComponent from '@/components/NavBarComponent.vue';
import backgroundImage from '@/assets/makanan.jpg';
import FooterComponent from '@/components/public/FooterComponent.vue';

const route = useRoute();
</script>