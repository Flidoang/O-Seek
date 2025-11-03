<template>
    <div class="w-full h-full">
        <!-- Map Container -->
        <div ref="mapContainer" class="w-full h-96 rounded-xl shadow-lg border border-gray-200"></div>
        
        <!-- Map Controls -->
        <div class="mt-4 flex flex-wrap gap-2">
            <button @click="centerToJakarta" 
                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Ke Jakarta
            </button>
            
            <button @click="centerToBandung" 
                class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Ke Bandung
            </button>
            
            <button @click="addRandomMarker" 
                class="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Tambah Marker
            </button>
            
            <button @click="clearMarkers" 
                class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Hapus Marker
            </button>
        </div>
        
        <!-- Info Panel -->
        <div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Info Peta</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <span class="font-medium text-gray-600">Koordinat:</span>
                    <p class="text-gray-800">{{ currentCoords.lat.toFixed(4) }}, {{ currentCoords.lng.toFixed(4) }}</p>
                </div>
                <div>
                    <span class="font-medium text-gray-600">Zoom Level:</span>
                    <p class="text-gray-800">{{ currentZoom }}</p>
                </div>
                <div>
                    <span class="font-medium text-gray-600">Total Marker:</span>
                    <p class="text-gray-800">{{ markerCount }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix untuk marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Refs
const mapContainer = ref(null);
const currentCoords = ref({ lat: -6.2088, lng: 106.8456 });
const currentZoom = ref(13);
const markerCount = ref(0);

let map = null;
let markersLayer = L.layerGroup();

// Koordinat kota-kota di Indonesia
const cities = {
    jakarta: [-6.2088, 106.8456],
    surabaya: [-7.2504, 112.7688],
    bandung: [-6.9175, 107.6191],
    bali: [-8.4095, 115.1889],
    yogyakarta: [-7.7956, 110.3695]
};

onMounted(() => {
    initializeMap();
});

onUnmounted(() => {
    if (map) {
        map.remove();
    }
});

const initializeMap = () => {
    if (!mapContainer.value) return;

    // Inisialisasi map
    map = L.map(mapContainer.value).setView(cities.jakarta, 13);

    // Tambahkan tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" class="text-blue-600 hover:text-blue-800">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Tambahkan markers layer
    markersLayer.addTo(map);

    // Event listeners
    map.on('move', updateMapInfo);
    map.on('zoom', updateMapInfo);
    map.on('click', onMapClick);

    // Tambahkan marker awal
    addCityMarker('Jakarta', cities.jakarta, 'Ibu kota Indonesia');
    addCityMarker('Bandung', cities.bandung, 'Kota Kembang');
    
    updateMapInfo();
};

const updateMapInfo = () => {
    if (!map) return;
    
    const center = map.getCenter();
    currentCoords.value = {
        lat: center.lat,
        lng: center.lng
    };
    currentZoom.value = map.getZoom();
};

const onMapClick = (e) => {
    const { lat, lng } = e.latlng;
    addCustomMarker(lat, lng, `Lokasi: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
};

const addCityMarker = (name, coords, description) => {
    const marker = L.marker(coords).addTo(markersLayer);
    marker.bindPopup(`
        <div class="p-2">
            <h4 class="font-bold text-gray-800">${name}</h4>
            <p class="text-sm text-gray-600 mt-1">${description}</p>
            <p class="text-xs text-gray-500 mt-2">${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}</p>
        </div>
    `);
    markerCount.value++;
};

const addCustomMarker = (lat, lng, popupText) => {
    const marker = L.marker([lat, lng]).addTo(markersLayer);
    marker.bindPopup(`
        <div class="p-2">
            <h4 class="font-bold text-gray-800">Marker Baru</h4>
            <p class="text-sm text-gray-600 mt-1">${popupText}</p>
            <button onclick="this.closest('.leaflet-popup')._source.remove()" 
                class="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors">
                Hapus
            </button>
        </div>
    `).openPopup();
    markerCount.value++;
};

const centerToJakarta = () => {
    if (map) {
        map.setView(cities.jakarta, 13);
    }
};

const centerToSurabaya = () => {
    if (map) {
        map.setView(cities.surabaya, 13);
    }
};

const centerToBandung = () => {
    if (map) {
        map.setView(cities.bandung, 13);
    }
};

const addRandomMarker = () => {
    if (!map) return;
    
    const bounds = map.getBounds();
    const lat = bounds.getNorth() - Math.random() * (bounds.getNorth() - bounds.getSouth());
    const lng = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());
    
    addCustomMarker(lat, lng, `Marker Acak #${markerCount.value + 1}`);
};

const clearMarkers = () => {
    markersLayer.clearLayers();
    markerCount.value = 0;
};
</script>

<style>
/* Custom styling untuk Leaflet popup */
:deep(.leaflet-popup-content-wrapper) {
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

:deep(.leaflet-popup-content) {
    margin: 0;
    font-family: 'Inter', sans-serif;
}

:deep(.leaflet-popup-tip) {
    box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
}
</style>