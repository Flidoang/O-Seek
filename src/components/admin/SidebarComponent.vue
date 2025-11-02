<template>
    <main class="relative min-h-screen">
        <!-- Mobile Toggle Button -->
        <div class="lg:hidden fixed top-4 left-4 z-50">
            <button type="button" @click="isSidebarOpen = true"
                class="py-2 px-4 inline-flex justify-center items-center gap-x-2 bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-gray-950 focus:outline-none focus:bg-gray-900">
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <span>Menu</span>
            </button>
        </div>

        <!-- Overlay untuk mobile -->
        <transition enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
            leave-to-class="opacity-0">
            <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
                class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
            </div>
        </transition>

        <!-- Sidebar -->
        <aside :class="[
            'fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-full flex flex-col',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0',
            isMinified ? 'w-16' : 'w-64'
        ]">

            <!-- Header -->
            <header :class="[
                'py-4 px-4 flex items-center gap-x-2 border-b border-gray-200 flex-shrink-0',
                isMinified ? 'justify-center' : 'justify-between'
            ]">
                <a class="flex-none font-semibold text-xl text-black hover:opacity-80 focus:outline-none focus:opacity-80 transition-opacity"
                    href="#" aria-label="Brand">
                    {{ isMinified ? 'B' : 'Brand' }}
                </a>

                <button v-if="!isMinified" type="button" @click="isSidebarOpen = false"
                    class="lg:hidden flex justify-center items-center size-8 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus:bg-gray-100 transition-colors">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                    <span class="sr-only">Close</span>
                </button>

                <button v-if="!isMinified" type="button" @click="isMinified = !isMinified"
                    class="hidden lg:flex justify-center items-center size-8 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus:bg-gray-100 transition-colors"
                    aria-label="Minimize navigation">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M15 3v18" />
                        <path d="m10 15-3-3 3-3" />
                    </svg>
                    <span class="sr-only">Minimize</span>
                </button>
            </header>

            <!-- Navigation Body -->
            <nav
                class="flex-1 overflow-y-auto py-4 px-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                <ul class="space-y-1">
                    <!-- Menu Item dengan Submenu -->
                    <li v-for="item in menuItems" :key="item.id">
                        <!-- Parent Menu dengan Submenu -->
                        <button v-if="item.submenu" type="button" @click="toggleSubmenu(item.id)" :class="[
                            'w-full min-h-[40px] flex items-center gap-x-3 py-2 px-3 text-sm rounded-lg transition-colors',
                            isMenuActive(item) ? 'bg-gray-100 text-gray-800' : 'text-gray-800 hover:bg-gray-100',
                            'focus:outline-none focus:bg-gray-100']" :title="isMinified ? item.label : ''">
                            <component :is="item.icon" class="size-5 flex-shrink-0" />

                            <span v-if="!isMinified" class="flex items-center justify-between flex-1">
                                <span class="truncate">{{ item.label }}</span>
                                <div class="flex items-center gap-2">
                                    <span v-if="item.badge"
                                        class="py-0.5 px-2 text-xs bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                                        {{ item.badge }}
                                    </span>
                                    <svg :class="[
                                        'size-4 flex-shrink-0 transition-transform duration-200',
                                        expandedMenus.includes(item.id) ? 'rotate-180' : ''
                                    ]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </span>
                        </button>

                        <!-- Single Menu (tanpa submenu) -->
                        <router-link v-else :to="{ name: item.pathName }" 
                            custom v-slot="{ navigate, isActive }">
                            <a @click="navigate" :class="[
                                'min-h-[40px] flex items-center gap-x-3 py-2 px-3 text-sm rounded-lg transition-colors cursor-pointer',
                                isActive ? 'bg-gray-100 text-gray-800' : 'text-gray-800 hover:bg-gray-100',
                                'focus:outline-none focus:bg-gray-100'
                            ]" :title="isMinified ? item.label : ''">
                                <component :is="item.icon" class="size-5 flex-shrink-0" />

                                <span v-if="!isMinified" class="flex items-center justify-between flex-1 truncate">
                                    {{ item.label }}
                                    <span v-if="item.badge"
                                        class="ml-2 py-0.5 px-2 text-xs bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                                        {{ item.badge }}
                                    </span>
                                </span>
                            </a>
                        </router-link>

                        <!-- Submenu (Collapse/Expand) -->
                        <transition enter-active-class="transition-all duration-200 ease-out"
                            leave-active-class="transition-all duration-200 ease-in"
                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
                            leave-from-class="opacity-100 max-h-96" leave-to-class="opacity-0 max-h-0">
                            <ul v-if="item.submenu && expandedMenus.includes(item.id) && !isMinified"
                                class="mt-1 space-y-1 overflow-hidden">
                                <li v-for="subitem in item.submenu" :key="subitem.id">
                                    <router-link :to="{ name: subitem.pathName }" 
                                        custom v-slot="{ navigate, isActive }">
                                        <a @click="navigate" :class="[
                                            'min-h-[36px] flex items-center gap-x-3 py-2 pl-11 pr-3 text-sm rounded-lg transition-colors cursor-pointer',
                                            isActive ? 'bg-gray-100 text-gray-800 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                        ]">
                                            <span class="truncate">{{ subitem.label }}</span>
                                        </a>
                                    </router-link>
                                </li>
                            </ul>
                        </transition>
                    </li>
                </ul>
            </nav>

            <!-- Footer Toggle Button -->
            <div v-if="isMinified" class="hidden lg:flex justify-center py-4 border-t border-gray-200 flex-shrink-0">
                <button type="button" @click="isMinified = false"
                    class="flex justify-center items-center size-10 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus:bg-gray-100 transition-colors"
                    aria-label="Expand navigation">
                    <svg class="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M15 3v18" />
                        <path d="m8 9 3 3-3 3" />
                    </svg>
                    <span class="sr-only">Expand</span>
                </button>
            </div>
        </aside>
    </main>
</template>

<script setup>
import { ref, h, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

// Get current route
const route = useRoute()

// Emit events
const emit = defineEmits(['sidebar-toggle'])

// SVG Icon Components
const IconHome = () => h('svg', {
    class: 'size-5',
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
}, [
    h('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    h('polyline', { points: '9 22 9 12 15 12 15 22' })
])

const IconCalendar = () => h('svg', {
    class: 'size-5',
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
}, [
    h('rect', { width: 18, height: 18, x: 3, y: 4, rx: 2, ry: 2 }),
    h('line', { x1: 16, x2: 16, y1: 2, y2: 6 }),
    h('line', { x1: 8, x2: 8, y1: 2, y2: 6 }),
    h('line', { x1: 3, x2: 21, y1: 10, y2: 10 })
])

const IconBook = () => h('svg', {
    class: 'size-5',
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
}, [
    h('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }),
    h('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })
])

const IconSettings = () => h('svg', {
    class: 'size-5',
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
}, [
    h('path', { d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' }),
    h('circle', { cx: 12, cy: 12, r: 3 })
])

const IconUsers = () => h('svg', {
    class: 'size-5',
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
}, [
    h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
    h('circle', { cx: 9, cy: 7, r: 4 }),
    h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
    h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
])

// State
const isSidebarOpen = ref(false)
const isMinified = ref(false)
const expandedMenus = ref(['dashboard']) // Default expanded menu

// Menu Data Structure - PASTIKAN pathName sesuai dengan router
const menuItems = ref([
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: IconHome,
        pathName: 'Dashboard',
        submenu: null // Tidak ada submenu, langsung ke Dashboard
    },
    {
        id: 'management',
        label: 'Management',
        icon: IconCalendar,
        badge: 'New',
        pathName: 'Management',
        submenu: null // Tidak ada submenu
    },
    {
        id: 'documentation',
        label: 'Documentation',
        icon: IconBook,
        pathName: 'Documentation', // Route ini belum ada di router, buat dulu atau ganti
        submenu: null
    },
    {
        id: 'settings',
        label: 'Info Donasi',
        icon: IconSettings,
        pathName: 'InfoDonasi',
        submenu: null
    },
    {
        id: 'activity',
        label: 'Catatan Aktivitas',
        icon: IconUsers,
        pathName: 'CatatanAktivitas',
        submenu: null
    }
])

// Check if menu is active (parent or any submenu)
const isMenuActive = (item) => {
    if (route.name === item.pathName) return true
    if (item.submenu) {
        return item.submenu.some(sub => route.name === sub.pathName)
    }
    return false
}

// Toggle Submenu Function
const toggleSubmenu = (menuId) => {
    const index = expandedMenus.value.indexOf(menuId)
    if (index > -1) {
        expandedMenus.value.splice(index, 1)
    } else {
        expandedMenus.value.push(menuId)
    }
}

// Watch for minified state changes
watch(isMinified, (newVal) => {
    emit('sidebar-toggle', newVal)
})
</script>