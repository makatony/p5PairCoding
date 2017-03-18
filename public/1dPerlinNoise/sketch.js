var xoff = 0;
var graph = [];

function preload() {}

function setup() {
	createCanvas(300, 300);
}

function draw() {
	background(51);
	
	//newest perlin value
	xoff++;
	var xoffMod = xoff / 50;
	var perlin = map(noise(xoffMod), 0, 1, 0, height);
	graph.push(perlin);
	
	
	//rendering
	for (var x = graph.length; (x >= 0 && width - (graph.length - x) > 0); x--) {
		var thisY = graph[x];
		stroke(255)
		point(width - (graph.length - x), thisY)
	}
}
