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

	print(getData());

	let list = getDataFake();

	number_of_cards = list.length;
	// console.log("found " + number_of_cards + " cards")

	let cards = []

	for (let i = 0; i < list.length; i++){
		obj = list[i];
		cards.push(createCard(i,obj));
	}

	let grid = document.getElementById("grid-container")

	for (let i = 0; i < cards.length; i++){
		card = cards[i]
		grid.appendChild(card)
	}
	console.log(grid);
}

function formatIfRange(list,sufix){

	if(list.length == 0) return("??");
	if(list.length == 1) return(list[0] + sufix);
	
	return(list[0] + sufix + "- " + list[list.length - 1] + sufix);
	 
}

function createCard(n,obj){
	 //  front
	var img = document.createElement('img');
	img.setAttribute('src', obj.img);
	var name = document.createElement('div');
	name.classList.add("card-title")
	name.innerHTML = obj.name;


	var space = document.createElement('div');
	space.classList.add('space');
	space.innerHTML = formatIfRange(obj.space,"m<sup>2</sup>")

	var rooms = document.createElement('div');
	// rooms.classList.add('rooms');
	// rooms.innerHTML = obj.rooms
	var cost = document.createElement('div');
	cost.classList.add('cost');
 	cost.innerHTML = formatIfRange(obj.cost,"kr");

	var info_bar = document.createElement('div');
	info_bar.classList.add('infobar');
	info_bar.appendChild(space);
	// info_bar.appendChild(rooms);
	info_bar.appendChild(cost);


	var text = document.createElement('div');
	text.classList.add("info");
	text.innerHTML = cutTextBefore(obj.text,123);

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
	text.innerHTML = obj.text;

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



function getDataFake(){	// se for at forbinde med backend https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
	text =`
[
{
	"name":"4. Maj Kollegiet",
	"text": "Kollegiets form\u00E5l er at v\u00E6re hjem for unge under uddannelse som gennem et f\u00E6lles kollegieliv med kammerater fra forskellige samfundslag kan n\u00E5 frem til den samh\u00F8righedsf\u00F8lelse der er en betingelse for en sund udvikling af demokrati og frisind som var frihedskampens m\u00E5ls\u00E6tning. Samtidig skal kollegiet bidrage til at erindringen om Danmarks frihedskamp bevares i kommende generationer",
	"img": "img/4._Maj_Kollegiet.jpg",
	"space": ["12"],
	"cost": [2190],
	"tenants": 77,
	"links": []
},
{
	"name":"Blangstedgård-kollegiet",
	"text": "Kollegium med 1, 1½ og 2 rums boliger med en attraktiv udsigt mod Kohaveskoven.",
	"img": "img/blangstedgaardkollegiet.jpg",
	"space": ["23,5","47"],
	"cost": ["2,580","5,225"],
	"tenants": 50,
	"links": ["https://www.studiebolig-odense.dk/departments/314","http://www.blangstedgaard.dk/en-by-i-byen/lejebolig/hus-26"]
},
{
	"name":"Bredstedgade-kollegiet",
	"text": "none",
	"img": "img/no_image.jpg",
	"space": [],
	"cost": [],
	"tenants": 35,
	"links": []
},
{
	"name":"Carl Nielsen Kollegiet",
	"text": "Kollegiet har eget fælleshus, hvor der er gode fællesrum med tv, køkken og aktivitetsrum med bordtennis og dartspil. Der bliver løbende afholdt fællesarrangementer på kollegiet, såsom tour de chambre.",
	"img": "img/Carl_Nielsen_Kollegiet.jpg",
	"space": ["24","51"],
	"cost": ["2,383","4,841"],
	"tenants": 48,
	"links": ["https://www.studiebolig-odense.dk/departments/307"]
},
{
	"name":"Christmas Møllers Kollegie",
	"text": "Christmas Møllers Kollelegium er nyrenoveret i 2012/2013. Moderne ungdomboliger med køkken og bad beliggende tæt på Universitetet.",
	"img": "img/no_image.jpg",
	"space": ["30,9","46,4"],
	"cost": ["3,442","5,636"],
	"tenants": -1,
	"links": []
},
{
	"name":"H.C. Ørstedkollegiet",
	"text": "H.C. Ørstedkollegiet ligger på Niels Bohrs Allé i Odense. Det ligger tæt ved Hjallese, ca. 3,5 km. fra byens centrum, 3 km. fra Rosengårdcentret og er centralt placeret i forhold til studiesteder og indkøbsmuligheder. Kollegiet har egen fodbold- og beachvolleybane, basketbane samt en hyggelig fællesbar for beboerene med tilknyttede fælleslokaler, såsom træningslokale, musikrum og plads til at brygge sin egen øl",
	"img": "img/H.C. Ørstedkollegiet.jpg",
	"space": ["16","45"],
	"cost": ["1,561","2,765"],
	"tenants": "over 519",
	"links": ["https://www.studiebolig-odense.dk/departments/4301?page=1&language=da","https://www.hcokollegiet.dk"]
},
{
	"name":"Nyt kollegie",
	"text": "sekf hslef lkesflk jeslkf lsejflj selkf ",
	"img": "img/test3.jpg",
	"space": ["100","300"],
	"cost": ["100","200"],
	"tenants": -1,
	"links": []
},
{
	"name":"navn2 er mee-eeee-eeget-langt",
	"text": "dette er en tekst om det andet kollegie",
	"img": "img/test2.jpg",
	"space": ["11"],
	"cost": ["2500"],
	"tenants": -1,
	"links": []
},
{
	"name":"navn3",
	"text": "dette er en tekst om det tredje kollegie",
	"img": "img/test.jpg",
	"space": ["11"],
	"cost": ["2500"],
	"tenants": -1,
	"links": []
},
{
	"name":"navn4",
	"text": "dette er en tekst om det fjerde kollegie",
	"img": "img/test.jpg",
	"space": ["11"],
	"cost": ["2500"],
	"tenants": -1,
	"links": []
},
{
	"name": "Frejas Kollegie",
	"text": "dette er frejas kollegie",
	"img": "img/test2.jpg",
	"space": ["11"],	
	"cost": ["2500"],
	"tenants": -1,
	"links": []
}
]
`

const obj = JSON.parse(text);

return(obj)
}


async function getData(){
	// const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
	// const request = new Request(requestURL);

	// const response = await fetch(request);
	// const obj = await response.json();

	return(read_file("json/out.json"));
}

function cutTextBefore(s,cutoff){
	let search_length = 3;
	let end_string = "...";

	if(s.length < cutoff - search_length) {
		print("length: " + s.length);
		return(s);
	}

	let ss = s.substring(cutoff - search_length,cutoff);
	let index = ss.indexOf(' ');
	
	if(index == -1) return(s.substring(0,cutoff) + end_string);

	return(s.substring(0,cutoff - search_length + index) + end_string)

}