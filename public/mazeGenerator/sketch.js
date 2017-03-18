// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var COLS;
var ROWS;
var CELLWITDH = 15;
var cells = [];
var current;
var btStack = [];

function preload() {}

function setup() {
	// frameRate(10)
	createCanvas(600, 400);
	background(51);
	
	COLS = floor(width / CELLWITDH);
	ROWS = floor(height / CELLWITDH);
	
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			var cell = new Cell(x, y);
			cells.push(cell);
		}
	}
	current = cells[0];
	btStack.push(current);
}

function draw() {
	background(51);
	for (i in cells) {
		var cell = cells[i];
		cell.render();
	}
	
	current.visited = true;
	
	
	//front tracking
	var next = current.getRandomNeighbour();
	if (next) {
		current.removeWallTo(next);
		current = next;
		
		//backtracking stack
		btStack.push(current);
	}
	
	//backtracking
	else if (btStack.length > 0) {
		current = btStack.pop();
	}
	else {
		// console.log("finished")
	}
}
