mapboxgl.accessToken = '';
const map = new mapboxgl.Map({
    container: 'map', // ID of the container element
    style: 'mapbox://styles/mapbox/streets-v11', // Map style URL
    center: [-73.935242, 40.730610], // Initial center position [lng, lat]
    zoom: 10 // Initial zoom level
});

// Locations data
// locations will either be hardcoded into script or into geoJson format
// alternatively, we can utilize an external database to store our locations there

const locations = [
    {
        name: "Bronx Community College",
        coordinates: [-73.911073, 40.855522],
        description: "Loew Hall 125<br>Biweekly Wednesday: 10 AM – 4:30 PM and Thursday: 11 AM – 6:30 PM<br>Daily emergency pantry: 9 AM – 5 PM<br>Daily Healthy Food Cart access 9 AM – 5 PM"
    },
    {
        name: "Lehman College",
        coordinates: [-73.892606, 40.868092],
        description: "Student Life Building 120<br>Wednesday: 10 AM – 8 PM<br>Thursday: 10 AM – 5 PM"
    },
    // Add more locations as needed
];

// Add markers and popups to the map
locations.forEach(location => {
    new mapboxgl.Marker()
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3><p>${location.description}</p>`))
        .addTo(map);
});
