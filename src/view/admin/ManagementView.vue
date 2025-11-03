<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div class="container mx-auto px-4">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-800 mb-2">
                    Peta Interaktif Indonesia
                </h1>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Jelajahi lokasi-lokasi menarik di Indonesia dengan peta interaktif menggunakan Leaflet dan Vue 3
                </p>
            </div>

            <!-- Map Card -->
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <LeafletMapComponent />
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Navigasi Mudah</h3>
                    <p class="text-gray-600">Jelajahi berbagai lokasi dengan navigasi yang intuitif dan responsive.</p>
                </div>

                <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Tambah Marker</h3>
                    <p class="text-gray-600">Tambahkan marker kustom dengan klik pada peta atau menggunakan tombol.</p>
                </div>

                <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Informasi Real-time</h3>
                    <p class="text-gray-600">Dapatkan informasi koordinat dan zoom level secara real-time.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LeafletMapComponent from '@/components/LeafletMapComponent.vue';
</script>