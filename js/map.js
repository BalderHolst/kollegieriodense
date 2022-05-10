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

    for(i = 0; i < data.length;i++){
        let place = data[i]
        let location = place.location
        // console.log(locations);


        new mapboxgl.Marker({
            color:"red",
            scale: 0.8
        })
            .setLngLat([location.lon,location.lat])
            .setPopup(new mapboxgl.Popup().setHTML(createPopup(place)))
            .addTo(map);
    }

    
	// marker SDU
	new mapboxgl.Marker({
		color:"green",
		scale: 1.0
	})
	.setLngLat([10.42804651505347,55.3679072])
	.setPopup(new mapboxgl.Popup().setHTML("SDU"))
	.addTo(map);
}

function createPopup(place){
    var popup = document.createElement('div');
    popup.classList.add("place");

    var h = document.createElement('h3');
    h.classList.add("header")
    h.textContent = place.name;

    link_img = document.createElement('img');
    link_img.setAttribute('src',"../img/link.png");
    link_img.classList.add("link");

    link = document.createElement('a');
    if (place.redirect) {
        link.setAttribute("href", place.link);
        link.setAttribute("target", "_blanck");
    }
    else link.setAttribute("href", "../pages/Info-pages/" + place.name + ".html");
    link.appendChild(link_img);

    h.appendChild(link)

    var img = document.createElement('img');
    img.setAttribute('src', "../img/" + place.img);
    img.classList.add("place_img");

    popup.appendChild(h);
    popup.appendChild(img);

    return(popup.outerHTML);

}
