var CELLWITDH = 10;
var cells = [];
var inc = 0.1;

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
	background(51);
	var xoff = 0;
	var yoff = 0;
	noLoop();
	//newest perlin value
	
	
	for (var x = 0; x < COLS; x++) {
		xoff = 0;
		for (var y = 0; y < ROWS; y++) {
			var cell = cells[index(x, y)];
			var perlin = noise(xoff,yoff) * 255;
			if (perlin < 75) perlin = 0;
			cell.color = perlin;
			xoff += inc;
			
		}
		yoff += inc;
	}
	
	for (i in cells) {
		var cell = cells[i];
		cell.render();
	}
}
