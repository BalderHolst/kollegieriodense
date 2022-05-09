mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsZHVyMjAxMSIsImEiOiJjbDA0YnNuazIxbWh3M2VxaHJqNzZyOHljIn0.XEzLI5OFIxkbDslMUEONww';

var map;

setupMap();


function setupMap(){
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [10.38831,55.39594],
		zoom:11
	});

	// Add zoom and rotation controls to the map.
	map.addControl(new mapboxgl.NavigationControl());
}

// called by load_data.js when data is recieved
function add_markers(data){
    console.log(data);

	// marker SDU
	new mapboxgl.Marker({
		color:"green",
		scale: 1.0
	})
	.setLngLat([10.42804651505347,55.3679072])
	.setPopup(new mapboxgl.Popup().setHTML("SDU"))
	.addTo(map);
}

