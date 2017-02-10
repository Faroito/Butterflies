var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');

var generations = [];
var butterflies = [];

/*function setButterfly(size, xPos, yPos) {
    for (var tmp = 0; tmp < 2000; tmp += 1)
    {
		var x = Math.sin(tmp) * (Math.exp(Math.cos(tmp)) - (2 * Math.cos(4 * tmp)) - Math.pow(Math.sin(tmp / 12), 6));
		var y = Math.cos(tmp) * (Math.exp(Math.cos(tmp)) - (2 * Math.cos(4 * tmp)) - Math.pow(Math.sin(tmp / 12), 6));
		x = -x * size + xPos;
		y = -y * size + yPos;
		mainContext.fillRect(x, y, 1, 1);
    }
}*/

function setButterfly(size, xPos, yPos) {
	mainContext.fillRect(xPos, yPos, size, size);
}

function Butterfly(size, xPos, yPos, color) {
    this.size = size;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
    this.opacity = 1;
}

Butterfly.prototype.update = function() {    
    this.size += 0.2;
    this.opacity -= 0.02;
    mainContext.beginPath();
    setButterfly(this.size, this.xPos, this.yPos);
    mainContext.closePath();
    mainContext.fillStyle = this.color.replace("[[opacity]]", this.opacity);
    mainContext.fill();
    return (this.opacity);
};

function randomColor() {
	var red = Math.round(55 + Math.random() * 200);
    var blue = Math.round(55 + Math.random() * 200);
    var green = Math.round(55 + Math.random() * 200);
	return ('rgba(' + red + ',' + blue + ',' + green + ", [[opacity]])");
}

function drawButterflies(number) {
    for (var i = 0; i < number; i++) 
    {
    	//var randomX = 100 + Math.round(Math.random() * 1300);
        //var randomY = 100 + Math.round(Math.random() * 600);
        var randomX = 10 + Math.round(Math.random() * 1460);
        var randomY = 10 + Math.round(Math.random() * 760);
        var size = 15 + Math.random() * 15;
        var color = randomColor();
        var butterfly = new Butterfly(size, randomX, randomY, color);
        butterflies.push(butterfly);
    }
    draw();
}

/*function draw() {
    mainContext.clearRect(0, 0, 1500, 800);
    for (var i = 0; i < butterflies.length; i++) 
    {
        var myButterfly = butterflies[i];
        limits = myButterfly.update();
    }
    if (limits > 0) {
    	requestAnimationFrame(draw);
    }
}*/

function draw() {
    mainContext.clearRect(0, 0, 1500, 800);
    for (var i = 0; i < butterflies.length; i++) 
    {
        var myButterfly = butterflies[i];
        limits = myButterfly.update();
    }
    if (limits > 0) {
    	requestAnimationFrame(draw);
    }
}

drawButterflies(10);