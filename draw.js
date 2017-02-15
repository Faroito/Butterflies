var mainCanvas = document.getElementById("my-canvas");
var mainContext = mainCanvas.getContext('2d');
var mainGraph = document.getElementById("my-graph");
var graphContext = mainGraph.getContext('2d');

var k;
var end;
var i;
var start;
var nb;
var speed;
var myVar;

/* Draw butterflies */

function setButterfly(size, xPos, yPos) {
    mainContext.fillRect(xPos, yPos, size, size);
}

function Butterfly(size, xPos, yPos, color) {
    setButterfly(size, xPos, yPos);
    mainContext.fillStyle = color;
    mainContext.fill();
}

function randomColor() {
    var red = Math.round(55 + Math.random() * 200);
    var blue = Math.round(55 + Math.random() * 200);
    var green = Math.round(55 + Math.random() * 200);
    return ('rgba(' + red + ',' + blue + ',' + green + ", 0.8");
}

function drawButterflies(nb) {
    mainContext.clearRect(0, 0, 1200, 700)
    for (var i = 0; i < nb; i++) 
    {
        var randomX = 10 + Math.round(Math.random() * 1160);
        var randomY = 10 + Math.round(Math.random() * 660);
        var size = 15 + Math.random() * 15;
        var color = randomColor();
        Butterfly(size, randomX, randomY, color);
    }
    graphContext.fillStyle = color.replace("0.8", 1);;
}

/* Draw graph */

function drawGraph(nb, i, end) {
    graphContext.fillRect((i * 300) / end, 300 - ((nb * 300) / 1000), 300 / end, 300);
    graphContext.fill();
}

/* Simulate all the generations */

function generation() {
    drawButterflies(Math.round(nb));
    drawGraph(Math.round(nb), i, end);
    console.log(Math.round(nb))
    nb = k * nb * ((1000 - nb) / 1000);
    i += 1;
    if (i < end) {
        myVar = setTimeout(generation, speed);
    }
}

/* Get the input value */

function getFormValues() {
    i = 0;
    start = document.getElementById("nbdepart").value;
    nb = start;
    end = document.getElementById("nbgenerations").value;
    k = document.getElementById("growthrate").value;
    speed = document.getElementById("speed").value * 1000;
    console.log(Math.round(nb))
    graphContext.clearRect(0, 0, 300, 300)
    generation();
}

/* For graph value with mouse */

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top};
}

mainGraph.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(mainGraph, evt);
    for (i = 0; i < end ; i += 1) {
        var min = (i * 300) / end + 10;
        var max = min + 300 / end + 10;
        if (min < mousePos.x && mousePos.x < max) {
            var value = start;
            for (j = 0; j < i; j += 1) {
                value = k * value * ((1000 - value) / 1000);
            }
            console.log("Value = " + Math.round(value));
        }
    }
}, false);

