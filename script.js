// 1. Inisialisasi peta dan set view ke lokasi awal (Jakarta)
const map = L.map('map').setView([-6.2088, 106.8456], 13);

// 2. Tambahkan tile layer dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --- KODE LAMA (MARKER AWAL) ---
const monasMarker = L.marker([-6.1753924, 106.8271528]).addTo(map);
monasMarker.bindPopup('<b>Monas</b><br>Monumen Nasional, Jakarta.');

const bundaranHiMarker = L.marker([-6.1944, 106.8229]).addTo(map)
    .bindPopup('<b>Bundaran HI</b><br>Pusat bisnis dan perbelanjaan.');

const tamanMiniCircle = L.circle([-6.3024, 106.8952], {
    color: 'blue', fillColor: '#30f', fillOpacity: 0.3, radius: 1500
}).addTo(map).bindPopup('Taman Mini Indonesia Indah');

const kotaTuaPolygon = L.polygon([
    [-6.1352, 106.8133], [-6.1352, 106.8233],
    [-6.1252, 106.8233], [-6.1252, 106.8133]
]).addTo(map).bindPopup('Area Kota Tua Jakarta.');
// --- AKHIR KODE LAMA ---


// --- 👇 KODE BARU UNTUK PENCARIAN ---

// Variabel untuk menyimpan marker hasil pencarian
let searchResultMarker = null;

// 3. Inisialisasi kontrol geocoder dengan provider Nominatim
const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false, // Nonaktifkan marker default, kita akan buat sendiri
    placeholder: 'Cari lokasi...',
    errorMessage: 'Lokasi tidak ditemukan.',
    showResultIcons: true,
    suggestMinLength: 2,
    suggestTimeout: 250,
    queryMinLength: 1,
    // Menggunakan provider Nominatim dari OpenStreetMap
    geocoder: L.Control.Geocoder.nominatim(),
}).on('markgeocode', function(e) {
    
    // Hapus marker hasil pencarian sebelumnya (jika ada)
    if (searchResultMarker) {
        map.removeLayer(searchResultMarker);
    }

    // Ambil data bbox (bounding box) dari hasil geocoding
    const bbox = e.geocode.bbox;
    
    // Atur tampilan peta agar sesuai dengan bounding box hasil pencarian
    map.fitBounds(bbox);

    // Buat marker baru di lokasi hasil pencarian
    searchResultMarker = L.marker(e.geocode.center)
        .addTo(map)
        .bindPopup(e.geocode.name) // Tampilkan nama lokasi di popup
        .openPopup(); // Buka popup secara otomatis

}).addTo(map); // Tambahkan kontrol geocoder ke peta

// --- 👆 AKHIR KODE BARU ---