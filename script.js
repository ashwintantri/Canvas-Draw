//Canvas variables
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

//Store current and previous mouse position
var mouse = {
    x: 0,
    y: 0
};
var last_mouse = {
    x: 0,
    y: 0
};

//Image element
var outputcanvas = document.getElementById('canvasout');

//Store current value of pen color and width
var pencol = document.getElementById('pen-color');
var penwid = document.getElementById('pen-width');

//Variable to check mouse hover
var drawup = false;

//Set pen values
var drawcolor = 'black';
var drawwidth = penwid.value;

//Check for change in pen color and width
pencol.addEventListener('change', fcolor);
penwid.addEventListener('change', fwidth);

//Execute functions when respective buttons are clicked
document.getElementById('xsave').addEventListener("click", fsave);
document.getElementById('xclear').addEventListener("click", fclear);
document.getElementById('xdownload').addEventListener("click", fdown);

//Check for movement of mouse over the canvas
canvas.addEventListener('mousemove', function (e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw('move');
}, false);

//Check for click to draw
canvas.addEventListener('mousedown', function (e) {
    draw('down');
}, false);

//Check for release of click to stop drawing
canvas.addEventListener('mouseup', function (e) {
    draw('up');
}, false);

//Check for mouse outside the canvas
canvas.addEventListener('mouseout', function (e) {
    draw('up');
}, false);

//Draw on Canvas if clicked
function draw(a) {
    if (a == 'down') {
        drawup = true;
    }
    if (a == 'up') {
        drawup = false;
    }
    if (drawup) {
    	//Start
        ctx.beginPath();

        ///From previous point to current point
        ctx.moveTo(last_mouse.x, last_mouse.y); 
        ctx.lineTo(mouse.x, mouse.y); 

        //In selected color and width
        ctx.strokeStyle = drawcolor; 
        ctx.lineWidth = drawwidth; 

        //Draw it
        ctx.stroke();

        //Stop
        ctx.closePath();
    }


}

//Set color
function fcolor() {
    drawcolor = pencol.value;
}

//Set width
function fwidth() {
    drawwidth = penwid.value;
}

//Save
function fsave() {
    var dataURL = canvas.toDataURL(); //Take canvas data and change it to base64 image hex-code
    outputcanvas.src = dataURL; //Set canvas image element's source to the image code from canvas
    outputcanvas.style.display = 'inline'; //Display the image by converting the code back to an image
}

//Clear after confirmation
function fclear() {
    var flag = confirm("Clear Everything?");
    if (flag) {
        ctx.clearRect(0, 0, w, h);
        outputcanvas.style.display = 'none';
    }
}

//Download
function fdown() {
	var button = document.getElementById('xdownload');
	var dataURL = canvas.toDataURL('image/png');
	button.href = dataURL;
}
