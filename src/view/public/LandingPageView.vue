<template>
    <main>
        <!-- Hero Section -->
        <HeroComponent />

        <!-- List Section -->
        <ListDonasi />

        <!-- Donation Section -->
        <div class="bg-slate-200/50 py-10">
            <section class="flex flex-col items-center justify-center">
                <h1 class="text-4xl md:text-6xl font-semibold text-gray-900 mt-4">
                    Get started for free today
                </h1>
                <p class="max-w-lg text-center text-slate-500 mt-6">
                    Join thousands of users who are already creating amazing things, completely free to start.
                </p>
                <form
                    class="relative flex items-center rounded-md border border-slate-200 mt-6 text-sm max-w-md w-full">
                    <svg class="absolute left-3" width="19" height="17" viewBox="0 0 19 17" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 6 9.505 8.865a1 1 0 0 1-1.005 0L4 6" stroke="#90A1B9" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M16.3 1H2.7C1.761 1 1 1.84 1 2.875v11.25C1 15.161 1.761 16 2.7 16h13.6c.939 0 1.7-.84 1.7-1.875V2.875C18 1.839 17.239 1 16.3 1"
                            stroke="#90A1B9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type="email" name="email" placeholder="Enter your email"
                        class="focus:outline-none pl-10 py-5 bg-transparent w-full" required />
                    <button
                        class="shrink-0 mr-2 px-6 py-3 text-sm bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-md active:scale-95 transition duration-300 text-white">
                        Yuk Berdonasi
                    </button>
                </form>
            </section>

            <DonationComponent />

            <div class="flex items-center justify-center gap-2">
                <button type="button" aria-label="Previous" class="mr-4">
                    <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1L2 9.24242L11 17" stroke="#111820" stroke-opacity="0.7" stroke-width="2"
                            stroke-linecap="round" />
                    </svg>
                </button>

                <div class="flex gap-2 text-gray-500 text-sm md:text-base">
                    <button type="button"
                        class="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">
                        1
                    </button>
                    <button type="button"
                        class="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-indigo-500 text-white rounded-md transition-all">
                        2
                    </button>
                    <button type="button"
                        class="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">
                        3
                    </button>
                    <button type="button"
                        class="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">
                        4
                    </button>
                    <button type="button"
                        class="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">
                        5
                    </button>
                    <button type="button"
                        class="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">
                        6
                    </button>
                </div>

                <button type="button" aria-label="Next" class="ml-4">
                    <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L10 9.24242L1 17" stroke="#111820" stroke-opacity="0.7" stroke-width="2"
                            stroke-linecap="round" />
                    </svg>
                </button>
            </div>
        </div>
    </main>
</template>

<script setup>
import HeroComponent from '@/components/HeroComponent.vue'
import ListDonasi from '@/components/ListDonasi.vue'
import DonationComponent from '@/components/public/DonationComponent.vue';
</script>
