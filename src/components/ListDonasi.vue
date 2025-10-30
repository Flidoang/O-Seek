<template>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div class="border-b mb-5 flex justify-between text-sm">
            <div class="text-slate-300 flex items-center pb-2 pr-2 border-b-2 border-slate-300 uppercase">
                <!-- ikon -->
                <svg class="h-6 mr-3 text-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.005 455.005">
                    <path
                        d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"
                        fill="currentColor" />
                </svg>
                <p class="font-semibold inline-block">List Panti Asuhan</p>
            </div>
            <a href="#" class="text-slate-300">See All</a>
        </div>

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
                    <!-- <a href="#!">
                        <div
                            class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            Pesan
                        </div>
                    </a> -->
                </div>
                <div class="px-6 py-4 mb-auto bg-white">
                    <a href="#"
                        class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                        {{ product.nama }}
                    </a>
                    <p class="text-gray-500 text-sm">{{ product.harga }}</p>
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
        <div class="items-center justify-self-center mt-10">
            <button type="button"
                class="w-40 py-3 active:scale-95 transition text-sm text-white rounded-full bg-indigo-500">
                <p class="mb-0.5 uppercase">selanjutnya</p>
            </button>   
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
    },
    {
        id: 2,
        nama: 'Puja Rochmansyah',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
    },
    {
        id: 3,
        nama: 'Jhon Doe',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
    },
    {
        id: 4,
        nama: 'Wilian Baros',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
    },
    {
        id: 5,
        nama: 'Eliano Reindjers',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
    },
    {
        id: 6,
        nama: 'Thom haye',
        harga:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla omnis, tenetur pariatur accusamus nesciunt.',
    },
]
</script>
