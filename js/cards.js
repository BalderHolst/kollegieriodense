var number_of_cards = 0;



createCards();


for (var i = 0; i < number_of_cards; i++) {
	id = "card" + i;
	// document.getElementById(id).onclick = function() {  
	// 	console.log(i)  
	// };  
	card = document.getElementById(id)
	card.setAttribute('onclick', "flip(" + i + ")");
}

// ---------------------------------------------------- flip

function flip(n){
	id = "card" + n

	// console.log(document.getElementById(id));

	var element = document.getElementById(id)

	// console.log(element.classList.contains("flipped"));

	if (!element.classList.contains("flipped")){
		element.classList.add("flipped");
	}
	else{
		element.classList.remove("flipped");
	}

	
}


// ---------------------------------------------------- create cards

function createCards(){
	getData().then((data) => {
			// console.log(data)
			createCardGrid(data);
		})	
}



async function getData(){
	const response = await fetch('https://raw.githubusercontent.com/Baldur2011/Kollegier/main/json/scraped.json');
	const data = await response.json();

	return(data)
   
}

function createCardGrid(data){

	number_of_cards = data.length;
	// console.log("found " + number_of_cards + " cards")

	let cards = []

	for (let i = 0; i < data.length; i++){
		obj = data[i];
		cards.push(createCard(i,obj));
	}

	let grid = document.getElementById("grid-container")

	for (let i = 0; i < cards.length; i++){
		card = cards[i]
		card.setAttribute('onclick', "flip(" + i +")");
		grid.appendChild(card)
	}
	// console.log(grid);
}


function createCard(n,obj){
	 //  front
	 var img = document.createElement('img');
	 if(obj.img != undefined){ 
	 	img.setAttribute('src', obj.img);
	 }
	 else {
	 	img.setAttribute('src', "img/no_image.jpg")
	 };

	 var name = document.createElement('div');
	 name.classList.add("card-title")
	 name.innerHTML = obj.name;


	 var space = document.createElement('div');
	 space.classList.add('space');
	 space.innerHTML = format_range(obj.dorms.space,"m<sup>2</sup>")

	 var rooms = document.createElement('div');
	// rooms.classList.add('rooms');
	// rooms.innerHTML = obj.dorms.rooms
	var cost = document.createElement('div');
	cost.classList.add('cost');
	cost.innerHTML = format_range(obj.dorms.prices,"kr", false);

	var info_bar = document.createElement('div');
	info_bar.classList.add('infobar');
	info_bar.appendChild(space);
	// info_bar.appendChild(rooms);
	info_bar.appendChild(cost);


	var text = document.createElement('div');
	text.classList.add("info");
	text.innerHTML = cutTextBefore(obj.description,123);

	var card_front = document.createElement('div');
	card_front.classList.add("card-front");

	card_front.appendChild(img);
	card_front.appendChild(name);
	card_front.appendChild(info_bar);
	card_front.appendChild(text);

	// Back

	var header = document.createElement('h3');
	header.innerHTML = obj.name;
	header.classList.add("header");
	header.classList.add("description-header");


	var text = document.createElement('div');
	text.classList.add("description");
	text.innerHTML = obj.description;

	var card_back = document.createElement('div');
	card_back.classList.add("card-back");

	var button = document.createElement('a');
	button.classList.add("to-page");
	button.setAttribute("href","https://www.google.com/")
	button.innerHTML = "se mere"

	card_back.appendChild(header);
	card_back.appendChild(text);
	card_back.appendChild(button);

	 // Merge

	 var card = document.createElement('div');
	 card.classList.add("card");
	 card.appendChild(card_front)	
	 card.appendChild(card_back)

	 card.id = "card" + n;

	 var grid_item = document.createElement('div');
	 grid_item.appendChild(card);
	 grid_item.classList.add("grid-item");

	return(grid_item);
	}


function format_range(arr,ender, round = true){

	var numbers = []

	for (var i = 0; i <= arr.length; i++) {
		if(typeof(arr[i]) == "string") numbers.push(parseFloat(arr[i].replace(",",".")));
	}

		let min = Math.min.apply(Math, numbers);
		let max = Math.max.apply(Math, numbers);

	if(round == true){
		min = Math.round(min)
		max = Math.round(max)
	}

	// console.log(arr,numbers);

	if(min == max) return(min + ender);

	return(min + ender + " - " + max + ender);
}






function cutTextBefore(s,cutoff){
	let search_length = 3;
	let end_string = "...";

	if(s.length < cutoff - search_length) {
		// console.log("length: " + s.length);
		return(s);
	}

	let ss = s.substring(cutoff - search_length,cutoff);
	let index = ss.indexOf(' ');
	
	if(index == -1) return(s.substring(0,cutoff) + end_string);

	return(s.substring(0,cutoff - search_length + index) + end_string)

}

