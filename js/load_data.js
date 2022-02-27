

// get data from database and run these functions
getData().then((data) => {
	// console.log(data)
	createCardGrid(data);
	add_markers(data)
})


async function getData(){
	const response = await fetch('https://raw.githubusercontent.com/Baldur2011/Kollegier/main/json/scraped.json');
	const data = await response.json();

	return(data)
}