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