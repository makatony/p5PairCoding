var CELLWITDH = 10;
var inc = 0.1;
var cells = [];
var zoff = 0;
var xoff = 0;
var yoff = 0;

function preload() {}

function setup() {
	createCanvas(600, 400);
	
	COLS = floor(width / CELLWITDH);
	ROWS = floor(height / CELLWITDH);
	
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			var cell = new Cell(x, y);
			cells.push(cell);
		}
	}
}

function draw() {
	background(255);
	xoff = 0;
	yoff = 0;
	// noLoop();
	
	
	for (var x = 0; x < COLS; x++) {
		xoff = 0;
		for (var y = 0; y < ROWS; y++) {
			var cell = cells[index(x, y)];
			var perlin = noise(xoff, yoff, zoff) * TWO_PI;
			cell.vector = p5.Vector.fromAngle(perlin);
			xoff += inc;
			
		}
		yoff += inc;
	}
	zoff += inc / 4; //affected by time -> cannot be set to zero in draw function
	
	for (i in cells) {
		var cell = cells[i];
		cell.render();
	}
}
