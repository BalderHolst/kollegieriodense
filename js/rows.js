update();

window.onresize = function(event) {
    update();
};

function update(){
    width = Math.round(window.window.innerWidth/500)

    // console.log(width)

    document.documentElement.style.setProperty('--rows',width)
}
