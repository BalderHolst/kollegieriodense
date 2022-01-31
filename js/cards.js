var number_of_cards = 0;




createCards();


for (var i = 0; i < number_of_cards; i++) {
	id = "card" + i;
	// document.getElementById(id).onclick = function() {  
	// 	print(i)  
	// };  
	card = document.getElementById(id)
	card.setAttribute('onclick', "flip(" + i + ")");
}





function print(x){
	console.log(x)
}


// ---------------------------------------------------- flip

function flip(n){
	id = "card" + n

	print(document.getElementById(id));

	var element = document.getElementById(id)

	print(element.classList.contains("flipped"));

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
			console.log(data)
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
		grid.appendChild(card)
	}
	// console.log(grid);
}

// function formatIfRange(list,sufix){

// 	// if(list.length == 0) return("??");
// 	// if(list.length == 1) return(list[0] + sufix);
	
// 	// return(list[0] + sufix + "- " + list[list.length - 1] + sufix);

// 	return(list[0])
// }

function createCard(n,obj){
	 //  front
	 var img = document.createElement('img');
	 if(obj.img != undefined){ 
	 	console.log("sefjsle")
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
	 space.innerHTML = "obj.dorms.space"

	 var rooms = document.createElement('div');
	// rooms.classList.add('rooms');
	// rooms.innerHTML = obj.dorms.rooms
	var cost = document.createElement('div');
	cost.classList.add('cost');
	cost.innerHTML = "obj.dorms.cost";

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

	card_back.appendChild(header);
	card_back.appendChild(text);

	 // Merge

	 var card = document.createElement('div');
	 card.classList.add("card");
	 card.appendChild(card_front)	
	 card.appendChild(card_back)

	 card.id = "card" + n;

	 var grid_item = document.createElement('div');
	 grid_item.appendChild(card);
	 grid_item.classList.add("grid-item");

		// card.setAttribute('onclick', "test(0)");

		return(grid_item);
	}





function cutTextBefore(s,cutoff){
	let search_length = 3;
	let end_string = "...";

	if(s.length < cutoff - search_length) {
		// print("length: " + s.length);
		return(s);
	}

	let ss = s.substring(cutoff - search_length,cutoff);
	let index = ss.indexOf(' ');
	
	if(index == -1) return(s.substring(0,cutoff) + end_string);

	return(s.substring(0,cutoff - search_length + index) + end_string)

}

