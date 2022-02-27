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

	// marker SDU
	new mapboxgl.Marker({
		color:"green",
		scale: 1.0
	})
	.setLngLat([10.42804651505347,55.3679072])
	.setPopup(new mapboxgl.Popup().setHTML("SDU"))
	.addTo(map);



	for(i = 0; i < data.length;i++){
		let place = data[i]
		let locations = place.locations
		// console.log(locations);
		for (var n = 0; n < locations.length; n++) {

			let location = locations[n];
			
			new mapboxgl.Marker({
				color:"red",
				scale: 0.8
			})
			.setLngLat([location.lon,location.lat])
			.setPopup(new mapboxgl.Popup().setHTML(place.name + ' ' + "<a href=\"pages/Info-pages/" + place.name + ".html\"><img src=\"img/link.png\" style=\"height: 10px;\" alt=\"Link til side\"/></a>"))
			.addTo(map);
		}
	}


	

}

