let data = undefined;

// get data from database and run these functions
getData().then((data) => {
    data = data;
    createCardGrid(data);
    console.log(data);
	//add_markers(data)
})


async function getData(){
	const response = await fetch('https://raw.githubusercontent.com/Baldur2011/Kollegier/main/json/scraped.json');
	data = await response.json();

	return(data)
}
