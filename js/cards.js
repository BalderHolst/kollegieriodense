var number_of_cards = 0;


// createCards();



for (var i = 0; i < number_of_cards; i++) {
    id = "card" + i;
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
        element.children[1].classList.add("scroll")
    }
    else{
        element.classList.remove("flipped");
        setTimeout(() => element.children[1].classList.remove("scroll"),200)
    }


}


// ---------------------------------------------------- create cards


// gets called by load_data.py when data is recieved
function createCardGrid(data, sorting="alfabetic"){


    data = sort(data,sorting);

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
    //console.log(grid);
}

function reloadCards(sorting){
    var grid = document.getElementById("grid-container");
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    createCardGrid(data,sorting);
}


function createCard(n,obj){

    // console.log(obj)

    //  front
    var img = document.createElement('img');
    if(obj.img){ 
        img.setAttribute('src', "img/" + obj.img);
    }
    else {
        img.setAttribute('src', "img/no_image.jpg");
    };
    img.setAttribute('alt', obj.name);

    var name = document.createElement('div');
    name.classList.add("card-title")
    name.innerHTML = format_name(obj.name);



    var space = document.createElement('div');
    space.classList.add('space');


    var rooms = document.createElement('div');
    // rooms.classList.add('rooms');
    // rooms.innerHTML = obj.dorms.rooms
    var cost = document.createElement('div');
    cost.classList.add('cost');

    if (obj.dorms){
        space.innerHTML = format_space(obj.dorms.space)
        cost.innerHTML = format_price(obj.dorms.prices);
    }
    else{
        space.innerHTML = "? m<sup>2</sup>"
        cost.innerHTML = "? kr"
    }

    var info_bar = document.createElement('div');
    info_bar.classList.add('infobar');
    info_bar.appendChild(space);
    // info_bar.appendChild(rooms);
    info_bar.appendChild(cost);


    var text = document.createElement('div');
    text.classList.add("info");
    if('description' in obj) text.innerHTML = cutTextBefore(obj.description,123);

    var card_front = document.createElement('div');
    card_front.classList.add("card-front");

    card_front.appendChild(img);
    card_front.appendChild(name);
    card_front.appendChild(info_bar);
    card_front.appendChild(text);

    // Back

    var header = document.createElement('h3');
    header.innerHTML = format_name(obj.name);
    header.classList.add("header");
    header.classList.add("description-header");


    var text = document.createElement('div');

    text.classList.add("facilities");

    
    if(obj.facilities){
        if(obj.facilities.constructor === Array) text.appendChild(makeHTMLList(obj.facilities));
        else {
            t = document.createElement('div');
            t.textContent = obj.facilities;
            text.appendChild(t);
        }
    }
    else {
        var t = document.createElement('div');
        t.textContent = "(Ingen yderligere beskrivelse af kollegiet. Desværre.)";
        text.appendChild(t);
    }
    if(obj.facilities === ""){
        var t = document.createElement('div');
        t.textContent = "(Ingen yderligere beskrivelse af kollegiet. Desværre.)";
        text.appendChild(t);
    }

    var card_back = document.createElement('div');
    card_back.classList.add("card-back");
    // card_back.classList.add("scroll");

    card_back.appendChild(header);
    card_back.appendChild(text);
    // card_back.appendChild(button);

    var button = document.createElement('a');
    button.classList.add("to-page");
    if(!obj.redirect){
        button.setAttribute("href","pages/Info-pages/" + obj.name + ".html");
    }
    else{
        button.setAttribute("href",obj.link);
        button.setAttribute("target","_blank");
    }
    button.innerHTML = "Se mere"
    // Merge

    var card = document.createElement('div');
    card.classList.add("card");
    card.appendChild(card_front)	
    card.appendChild(card_back)
    card.appendChild(button);

    card.id = "card" + n;

    var grid_item = document.createElement('div');
    grid_item.appendChild(card);
    grid_item.classList.add("grid-item");

    return(grid_item);
}

function format_name(name) {
    if (name.length > 14) return(name.replace("kollegiet","-kollegiet").replace(" -kollegiet"," kollegiet"));
    else return(name);
}

function format_price(arr){

    if (arr.length == 1) return(arr[0] + "kr");

    lowest = arr[0];
    highest = arr[arr.length -1]

    if (highest == lowest) return(arr[0] + "kr");

    return(lowest + "kr - " + highest + "kr");
}


function format_space(arr, round = true){

    const ender = "m<sup>2</sup>";

    var numbers = []

    for (var i = 0; i <= arr.length; i++) {
        if(typeof(arr[i]) == "string") numbers.push(parseFloat(arr[i].replace(",",".")));
    }

    let min = Math.min.apply(Math, numbers);
    let max = Math.max.apply(Math, numbers);

    if(round == true){
        min = Math.round(min);
        max = Math.round(max);
    }

    // console.log(arr,numbers);

    if(min == max) return(min + ender);

    return(min + ender + " - " + max + ender);
}


function makeHTMLList(l) {
    var HTMLList = document.createElement('ul');

    for (var i = 0; i < l.length; i++) {
        var HTMLItem = document.createElement('li');
        HTMLItem.innerHTML = l[i];

        HTMLList.appendChild(HTMLItem);


    }

    return(HTMLList);	
}



function cutTextBefore(s,cutoff){
    let search_length = 10;
    let end_string = "...";

    if(s.length < cutoff - search_length) {
        // console.log("length: " + s.length);
        return(s);
    }

    let ss = s.substring(cutoff - search_length,cutoff);
    let index = ss.indexOf('.');

    if(index == -1) return(s.substring(0,cutoff) + end_string);

    return(s.substring(0,cutoff - search_length + index) + end_string)

}

function sort(data, sorting){
    document.querySelector(".sorting .options .selected").classList.remove("selected");

    let menu = document.querySelector(".sorting .options");

    switch (sorting) {
        case 'alfabetic':
            menu.children[0].classList.add("selected");
            data = alfabeticsort(data);
            return(data)
            break;
        case 'price':
            menu.children[1].classList.add("selected");
            data.sort(minprice_compare);
            return(data)
            break;
        case 'space':
            menu.children[2].classList.add("selected");
            data.sort(minspace_compare);
            return(data);
            break;
        default:
            console.log(sorting + " is not a way of sorting")
            return(data);
    }


}

function alfabeticsort(data){
    const alfabet = "abcdefghijklmnopqrstuvwxyzæøå";
    d = {}
    for (let i = 0 ; i < alfabet.length ; i++) {
        d[alfabet[i]] = i; 
    }
    data.sort(function (a,b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();
        if (d[a[0]] < d[b[0]]) return (-1);

        if (d[a[0]] > d[b[0]]) return (1);
        return(0);
    }
    );
    return(data);
}

function minspace_compare(a, b) {
    aspace = [];
    bspace = [];

    for (let i = 0; i < a.dorms.space.length; i++) {
        aspace.push(parseInt(a.dorms.space[i].replace(",",".")));
    }
    for (let i = 0; i < b.dorms.space.length; i++) {
        bspace.push(parseInt(b.dorms.space[i].replace(",",".")));
    }

    let amin = Math.max.apply(Math, aspace);
    let bmin = Math.max.apply(Math, bspace);

    if (amin < bmin) { 
        return 1 
    };
    if (amin > bmin) { 
        return -1 
    } ;
    return(0);
}

function minprice_compare(a, b) {
    aprices = [];
    bprices = [];

    for (let i = 0; i < a.dorms.prices.length; i++) {
        aprices.push(parseInt(a.dorms.prices[i].replace(",","").replace(".","")));
    }
    for (let i = 0; i < b.dorms.prices.length; i++) {
        bprices.push(parseInt(b.dorms.prices[i].replace(",","").replace(".","")));
    }

    let amin = Math.min.apply(Math, aprices);
    let bmin = Math.min.apply(Math, bprices);

    if (amin < bmin) { 
        return -1 
    };
    if (amin > bmin) { 
        return 1 
    } ;
    return(0);
}


