var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');

var circles = [];

function Butterfly(radius, counter, xPos, yPos) {
    for (var tmp = 0; tmp < 5000; tmp += 1)
    {
	var x = Math.sin(tmp) * (Math.exp(Math.cos(tmp)) - (2 * Math.cos(4 * tmp)) - Math.pow(Math.sin(tmp / 12), 6));
	var y = Math.cos(tmp) * (Math.exp(Math.cos(tmp)) - (2 * Math.cos(4 * tmp)) - Math.pow(Math.sin(tmp / 12), 6));
	x = (-x * radius + xPos + counter) % 1500;
	y = (-y * radius + yPos + counter) % 800;
	if (x < 0)
	    x += 1500;
	if (y < 0)
	    y += 800;
	mainContext.fillRect(x, y, 1, 1);
    }
}

function Circle(radius, speed, width, xPos, yPos, color) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.counter = 0;
    this.color = color;
    var signHelper = Math.floor(Math.random() * 2);
    if (signHelper == 1) {
        this.sign = -1;
    } else {
        this.sign = 1;
      }
}

Circle.prototype.update = function() {    
    this.counter += this.sign * this.speed;
    mainContext.beginPath();
    /*mainContext.arc(this.xPos + Math.cos(this.counter / 100) * this.radius,
		    this.yPos + Math.sin(this.counter / 100) * this.radius,
		    this.width,
		    0,
		    Math.PI * 2,
		    false);*/
    Butterfly(this.radius, this.counter, this.xPos, this.yPos);
    mainContext.closePath();
    
    mainContext.fillStyle = this.color
    mainContext.fill();
};

function drawCircles() {
    for (var i = 0; i < 30; i++) {
        var randomX = Math.round(Math.random() * 1500);
        var randomY = Math.round(Math.random() * 800);
        var speed = 0.2 + Math.random();
        var size = 5 + Math.random() * 100;
	var red = Math.round(55 + Math.random() * 200);
	var blue = Math.round(55 + Math.random() * 200);
	var green = Math.round(55 + Math.random() * 200);
	var opacity = Math.round(Math.random() * 255);
	var color = 'rgba(' + red + ',' + blue + ',' + green + ',' + opacity + ')';
	var circle = new Circle(20, speed, size, randomX, randomY, color);
        circles.push(circle);
    }
    draw();
}

drawCircles();

function draw() {
    mainContext.clearRect(0, 0, 1500, 800);
    
    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }
    requestAnimationFrame(draw);
}

