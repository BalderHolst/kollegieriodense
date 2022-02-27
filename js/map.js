mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsZHVyMjAxMSIsImEiOiJjbDA0YnNuazIxbWh3M2VxaHJqNzZyOHljIn0.XEzLI5OFIxkbDslMUEONww';

var map;

setupMap();


function setupMap(){
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [10.38831,55.39594],
		zoom:10
	});

	// Add zoom and rotation controls to the map.
	map.addControl(new mapboxgl.NavigationControl());
}

// called by load_data.js when data is recieved
function add_markers(data){
	for(i = 0; i < data.length;i++){
		let place = data[i]
		let locations = place.locations
		// console.log(locations);
		for (var n = 0; n < locations.length; n++) {

			let location = locations[n];
			
			new mapboxgl.Marker()
			.setLngLat([location.lon,location.lat])
			.setPopup(new mapboxgl.Popup().setHTML(place.name))
			.addTo(map);
		}
	}


	

}

