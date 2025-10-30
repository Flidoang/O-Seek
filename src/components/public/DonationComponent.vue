<template>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div v-if="products && products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div v-for="product in products" :key="product.id" class="rounded overflow-hidden shadow-lg flex flex-col">
                <div class="relative">
                    <a href="#">
                        <!-- pakai image default -->
                        <img class="w-full object-cover h-48" :src="product.image || defaultImage"
                            :alt="product.nama" />
                        <div
                            class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>
                    </a>

                </div>
                <div class="px-6 py-4 mb-auto bg-white">
                    <a href="#"
                        class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                        {{ product.nama }}
                    </a>
                    <p class="text-gray-500 text-sm">{{ product.harga }}</p>
                    <div class="relative flex items-center max-w-80 w-full bg-gray-500/20 h-5 rounded-full mt-5">
                        <div class="bg-blue-600 h-5 rounded-full" :style="{ width: product.progres + '%' }">
                            <span
                                class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                {{ product.progres }}%
                            </span>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-3 justify-items-end bg-gray-100 text-xs text-gray-900">
                    <a href="" class="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                        Mari Berdonasi
                        <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
const defaultImage = '/assets/default.jpg';

const products = [
    {
        id: 1,
        nama: 'Rafli Hendarsyah',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
        progres: 66,
    },
    {
        id: 2,
        nama: 'Puja Rochmansyah',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
        progres: 25,
    },
    {
        id: 3,
        nama: 'Jhon Doe',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
        progres: 100,
    },
    {
        id: 4,
        nama: 'Wilian Baros',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
        progres: 39,
    },
    {
        id: 5,
        nama: 'Eliano Reindjers',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
        progres: 81,
    },
    {
        id: 6,
        nama: 'Thom haye',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
        progres: 0,
    },
]
</script>
