// Initialize the Leaflet map centered over the U.S.
const map = L.map('map').setView([39.8283, -98.5795], 4);

// Add an OpenStreetMap tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Define location data with coordinates and titles.
const locations = {
  nyc:    { coords: [40.7128, -74.0060], title: "NYC, NY" },
  boston: { coords: [42.3601, -71.0589], title: "Boston, MA" },
  provo:  { coords: [40.2338, -111.6585], title: "Provo, UT" },
  natal:  { coords: [-5.7945, -35.2110], title: "Natal, RN, Brazil" },
  austin: { coords: [30.2672, -97.7431], title: "Austin, TX" }
};

// Create markers for each location and store them.
const markers = {};
for (const key in locations) {
  const marker = L.marker(locations[key].coords)
    .addTo(map)
    .bindPopup(locations[key].title);
  marker._locationKey = key;
  markers[key] = marker;

  // On marker hover, highlight corresponding timeline entries.
  marker.on('mouseover', function() {
    document.querySelectorAll(`.entry[data-location="${this._locationKey}"]`)
      .forEach(entry => entry.classList.add('highlight'));
    this.openPopup();
  });
  marker.on('mouseout', function() {
    document.querySelectorAll(`.entry[data-location="${this._locationKey}"]`)
      .forEach(entry => entry.classList.remove('highlight'));
    this.closePopup();
  });
}

// Add hover events for timeline entries to interact with markers.
document.querySelectorAll('.entry').forEach(entry => {
    entry.addEventListener('mouseover', function() {
      const locKey = this.getAttribute('data-location');
      if (markers[locKey]) {
        markers[locKey].openPopup();
        // Center the map on the coordinate with animation.
        map.panTo(locations[locKey].coords, { animate: true });
      }
      this.classList.add('highlight');
    });
    entry.addEventListener('mouseout', function() {
      const locKey = this.getAttribute('data-location');
      if (markers[locKey]) {
        markers[locKey].closePopup();
      }
      this.classList.remove('highlight');
    });
  });
  