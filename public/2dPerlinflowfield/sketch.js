
var inc = 0.01;

function preload() {}

function setup() {
	createCanvas(300, 300);
	pixelDensity(1);
}

function draw() {
	background(51);
	var xoff = 0;
	var yoff = 0;
	noLoop()
	//newest perlin value
	
	
	loadPixels();
	for (var x = 0; x < width; x++) {
		xoff = 0;
		for (var y = 0; y < height; y++) {;
			var perlin = noise(xoff,yoff) * 255;
			var r = perlin;
			pixels[index(x, y) + 0] = r;
			pixels[index(x, y) + 1] = r;
			pixels[index(x, y) + 2] = r;
			pixels[index(x, y) + 4] = 255;
			xoff += inc;
			
		}
		yoff += inc;
	}
	updatePixels();
	
}

function index(x, y) {
	return (x + y * width) * 4
}
