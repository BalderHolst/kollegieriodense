var selected = 0

select(selected);


function select(n){

	var old_selection = document.getElementsByClassName('selected'); //find alle tags der er "selected"
	if(old_selection.length > 0) old_selection[0].classList.remove('selected'); //Hvis den finder et, så "unselecter" den det

	id = "option" + n;
	element = document.getElementById(id);

	element.classList.add("selected");


	show_floorplan(n);
	show_selector(n);
}

function show_floorplan(n){
	// console.log("showing floorplan " + n);
	var old_selection = document.getElementsByClassName('show-floorplan'); //find alle tags der er "shown"
	if(old_selection.length > 0) old_selection[0].classList.remove('show-floorplan'); //Hvis den finder et, så "unshower" den det

	id = "img" + n;
	element = document.getElementById(id);
	
	if(element != null) element.classList.add('show-floorplan');	
}

function show_selector(n){
	console.log("showing selector " + n);
	var old_selection = document.getElementsByClassName('show-selector'); //find alle tags der er "shown"
	if(old_selection.length > 0) {  //Hvis den finder et, så "unshower" den det
		old_selection[0].classList.remove('show-selector');
	} 

	id = "selector" + n;
	element = document.getElementById(id);

	// console.log(element);

	if(element != null) element.classList.add('show-selector');
}


