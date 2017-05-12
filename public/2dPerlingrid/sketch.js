var CELLWITDH = 2;
var cells = [];
var inc = 0.1;
var startCell = undefined;
var endCell = undefined;
var PERLINTHRESHOLD = 100;
var ASTAR_P5 = true;

function preload() {}

function setup() {
	console.log("using a* P5, i.e. showing the path slowly. if you want to calculate in the background, chose ASTAR_P5 = false");
	
	createCanvas(600, 400);
	background(51);
	VISITEDCOLOR = color(51, 51, 51);
	CURRENTCOLOR = color(255, 255, 255);
	OPENSETCOLOR = color(200, 151, 0);
	CLOSEDSETCOLOR = color(0, 250, 150);
	
	COLS = floor(width / CELLWITDH);
	ROWS = floor(height / CELLWITDH);
	
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			var cell = new Cell(x, y);
			cell.water = false;
			cells.push(cell);
		}
	}
	
	var xoff = 0;
	var yoff = 0;
	for (var x = 0; x < COLS; x++) {
		xoff = 0;
		for (var y = 0; y < ROWS; y++) {
			var cell = cells[indx(x, y)];
			var perlin = noise(xoff, yoff) * 255;
			if (perlin < PERLINTHRESHOLD) {
				cell.color = color(50, 50, 150);
				cell.water = true;
			} else
				cell.color = color(perlin, 150, perlin);
			xoff += inc;
			
		}
		yoff += inc;
	}
	
	for (i in cells) {
		var cell = cells[i];
		cell.render();
	}
	
	aStar_setup();
	
	noLoop();
}

function draw() {
	document.getElementById("framerate").innerHTML = floor(frameRate());
	
	for (i in openSet) {
		openSet[i].render(OPENSETCOLOR);
	}
	for (i in closedSet) {
		closedSet[i].render(CLOSEDSETCOLOR);
	}
	aStar_draw();
	
}

function aStar_setup() {
	closedSet = []; // visited
	openSet = [];
	
	gScore = Array.apply(null, Array(cells.length)).map(Number.prototype.valueOf, Infinity); //initializes array with Infinity
	fScore = Array.apply(null, Array(cells.length)).map(Number.prototype.valueOf, Infinity); //initializes array with Infinity
	
}

function aStar_start(_start, _end) {
	start = _start; //making global variables
	end = _end;
	closedSet = []; // visited
	openSet = [start];
	
	gScore[start.getIndex()] = 0;
	fScore[start.getIndex()] = start.getDist(end);
	
	loop();
	
}

function aStar_draw() {
	if (openSet.length > 0) {
		// console.log("new current");
		var current = openSet.reduce(function (prev, curr) {
				return fScore[prev.getIndex()] < fScore[curr.getIndex()] ? prev : curr;
			});
		aStar_reconstructPath(current);
		
		if (current == end) {
			curr = current;
			console.log(aStar_reconstructPath(curr));
			noLoop();
			return;
		}
		
		openSet = openSet.filter(function (el) { // removes current from openset
				return el !== current;
			});
		closedSet.push(current);
		
		var neighbours = current.getNeighbours();
		for (i in neighbours) {
			neighbour = neighbours[i];
			if (neighbour.water) // avoid water
				continue;
			
			if (closedSet.indexOf(neighbour) >= 0)
				continue;
			
			var tentative_gScore = gScore[current.getIndex()] + current.getDist(neighbour);
			if (openSet.indexOf(neighbour) < 0)
				openSet.push(neighbour);
			else if (tentative_gScore >= gScore[neighbour.getIndex()])
				continue;
			
			// console.log("new best score for current")
			
			neighbour.cameFrom = current;
			gScore[neighbour.getIndex()] = tentative_gScore;
			fScore[neighbour.getIndex()] = gScore[neighbour.getIndex()] + neighbour.getDist(end);
		}
		
	}
}

function aStar_isolated(start, end) {
	var closedSet = []; // visited
	var openSet = [start];
	
	var gScore = Array.apply(null, Array(cells.length)).map(Number.prototype.valueOf, Infinity); //initializes array with Infinity
	gScore[start.getIndex()] = 0;
	var fScore = Array.apply(null, Array(cells.length)).map(Number.prototype.valueOf, Infinity); //initializes array with Infinity
	fScore[start.getIndex()] = start.getDist(end);
	while (openSet.length > 0) {
		// console.log("new current");
		var current = openSet.reduce(function (prev, curr) {
				return fScore[prev.getIndex()] < fScore[curr.getIndex()] ? prev : curr;
			});
		
		if (current == end) {
			for (i in openSet) {
				openSet[i].render(OPENSETCOLOR);
			}
			for (i in closedSet) {
				closedSet[i].render(CLOSEDSETCOLOR);
			}
			
			return aStar_reconstructPath(current);
		}
		
		openSet = openSet.filter(function (el) { // removes current from openset
				return el !== current;
			});
		closedSet.push(current);
		
		var neighbours = current.getNeighbours();
		for (i in neighbours) {
			neighbour = neighbours[i];
			if (neighbour.water) // avoid water
				continue;
			
			if (closedSet.indexOf(neighbour) >= 0)
				continue;
			
			var tentative_gScore = gScore[current.getIndex()] + current.getDist(neighbour);
			if (openSet.indexOf(neighbour) < 0)
				openSet.push(neighbour);
			else if (tentative_gScore >= gScore[neighbour.getIndex()])
				continue;
			
			// console.log("new best score for current")
			neighbour.cameFrom = current;
			gScore[neighbour.getIndex()] = tentative_gScore;
			fScore[neighbour.getIndex()] = gScore[neighbour.getIndex()] + neighbour.getDist(end);
		}
		
	}
}

function aStar_reconstructPath(current) {
	var totalPath = [current];
	while (current.cameFrom instanceof Cell) {
		current.render(CURRENTCOLOR);
		current = current.cameFrom;
		totalPath.push(current);
	}
	return totalPath;
}

function mousePressed() {
	var index = indx(floor(mouseX / CELLWITDH), floor(mouseY / CELLWITDH));
	var cell = cells[index];
	if (!startCell)
		startCell = cell;
	else if (!endCell) {
		endCell = cell;
		if (ASTAR_P5) {
			aStar_start(startCell, endCell);
		} else
			console.log(aStar_isolated(startCell, endCell));
	} else
		return;
	
	cell.color = color(255, 0, 0);
	cell.render();
}
