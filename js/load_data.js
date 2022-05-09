let data = undefined;

// get data from database and run these functions
getData().then((data) => {
    data = data;
    if (typeof createCardGrid === "function") createCardGrid(data);
	if (typeof add_markers === "function") add_markers(data);
    //console.log(data);
})


async function getData(){
	const response = await fetch('https://raw.githubusercontent.com/Baldur2011/Kollegier/main/json/scraped.json');
	data = await response.json();

	return(data)
}
