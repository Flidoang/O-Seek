<template>
    <div class="min-h-screen bg-gray-50 flex">
        <!-- Sidebar Component -->
        <SidebarComponent @sidebar-toggle="handleSidebarToggle" />

        <!-- Main Content Area -->
        <main :class="[
            'flex-1 transition-all duration-300 min-h-screen',
            isMinified ? 'lg:pl-16' : 'lg:pl-64'
        ]">
            <!-- Header/Navbar (Optional) -->
            <header class="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div class="px-6 py-[18px]">
                    <h2 class="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
                </div>
            </header>

            <!-- Content Area -->
            <div class="p-6">
                <RouterView />
            </div>
        </main>
    </div>
</template>

<script setup>
import SidebarComponent from '@/components/admin/SidebarComponent.vue'
import { ref } from 'vue'

// State untuk menerima dari sidebar
const isMinified = ref(false)

// Handle event dari sidebar
const handleSidebarToggle = (minified) => {
    isMinified.value = minified
}
</script>