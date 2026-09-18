const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  // Set view to current location
  map.setView([lat, lng], 14);

  // Set marker to current location and open it
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      '<strong>This is your location</strong><br/><i>According to your browser...</i>',
    )
    .openPopup();
});
