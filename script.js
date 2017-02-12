var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');

var butterflies = [];

function setButterfly(size, xPos, yPos) {
	mainContext.fillRect(xPos, yPos, size, size);
}

function Butterfly(size, xPos, yPos, color) {
    setButterfly(size, xPos, yPos);
    mainContext.closePath();
    mainContext.fillStyle = color.replace("[[opacity]]", 0.8);
    mainContext.fill();
}

function randomColor() {
	var red = Math.round(55 + Math.random() * 200);
    var blue = Math.round(55 + Math.random() * 200);
    var green = Math.round(55 + Math.random() * 200);
	return ('rgba(' + red + ',' + blue + ',' + green + ", [[opacity]])");
}

function drawButterflies(nb, k, lim) {
	mainContext.clearRect(0, 0, 1200, 700)
    for (var i = 0; i < nb; i++) 
    {
       	var randomX = 10 + Math.round(Math.random() * 1160);
       	var randomY = 10 + Math.round(Math.random() * 660);
       	var size = 15 + Math.random() * 15;
       	var color = randomColor();
       	var butterfly = new Butterfly(size, randomX, randomY, color);
       	butterflies.push(butterfly);
   	}
}

var start = 10;
var k = 3.3;
var end = 100;
var i = 0;
var nb = start;
var speed = 1000;
var myVar;

function generation() {
	nb = k * nb * ((1000 - nb) / 1000);
	drawButterflies(Math.round(nb));
	console.log(Math.round(nb))
	i += 1;
	if (i < end) {
		myVar = setTimeout(generation, 1000);
	}
}

function getFormValues() {
    start = document.getElementById("nbdepart").value;
    end = document.getElementById("nbgenerations").value;
    k = document.getElementById("growthrate").value;
    speed = document.getElementById("speed").value * 1000;
    generation();
}