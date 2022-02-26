async function getData(){
	const response = await fetch('https://raw.githubusercontent.com/Baldur2011/Kollegier/main/json/scraped.json');
	const data = await response.json();

	return(data)
}