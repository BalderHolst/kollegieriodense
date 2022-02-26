mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsZHVyMjAxMSIsImEiOiJjbDA0YnNuazIxbWh3M2VxaHJqNzZyOHljIn0.XEzLI5OFIxkbDslMUEONww';

var map;

setupMap();


// Create a new marker.
const marker = new mapboxgl.Marker()
    .setLngLat([10.38831,55.39594])
    .addTo(map);

function setupMap(){
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [10.38831,55.39594],
		zoom:11
	});
}

