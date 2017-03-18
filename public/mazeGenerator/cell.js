function Cell(x, y) {
	this.gridPos = {
		x: x,
		y: y
	};
	this.walls = {
		t: true,
		r: true,
		b: true,
		l: true
	};
	this.visited = false;
	
}

Cell.prototype.getNeighbours = function () {
	var x = this.gridPos.x;
	var y = this.gridPos.y;
	var neighbours = [];
	
	var top = cells[index(x, y - 1)];
	var right = cells[index(x + 1, y)];
	var bottom = cells[index(x, y + 1)];
	var left = cells[index(x - 1, y)];
	
	if ((y - 1 >= 0) && (!top.visited))
		neighbours.push(top);
	if ((x + 1 < COLS) && (!right.visited))
		neighbours.push(right);
	if ((y + 1 < ROWS) && (!bottom.visited))
		neighbours.push(bottom);
	if ((x - 1 >= 0) && (!left.visited))
		neighbours.push(left);
	return neighbours;
}

Cell.prototype.getRandomNeighbour = function () {
	var neighbours = this.getNeighbours();
	if (neighbours.length > 0)
		return neighbours[floor(Math.random() * neighbours.length)];
	else
		return undefined;
}

Cell.prototype.removeWallTo = function (cell) {
	var dx = this.gridPos.x - cell.gridPos.x;
	var dy = this.gridPos.y - cell.gridPos.y;
	if (dx == 1) { //cell to the left
		this.walls.l = false;
		cell.walls.r = false;
	}
	if (dx == -1) { //cell to the right
		this.walls.r = false;
		cell.walls.l = false;
	}
	if (dy == 1) { //cell to the top
		this.walls.t = false;
		cell.walls.b = false;
	}
	if (dy == -1) { //cell to the bottom
		this.walls.b = false;
		cell.walls.t = false;
	}
	
}

Cell.prototype.render = function () {
	var w = CELLWITDH;
	var x = this.gridPos.x * w;
	var y = this.gridPos.y * w;
	
	stroke(0);
	if (this.walls.t)
		line(x, y, x + w, y); //top line: left to right
	if (this.walls.l)
		line(x, y, x, y + w); //left line: up to down
	if (this.walls.r)
		line(x + w, y, x + w, y + w); //right line: up to down
	if (this.walls.b)
		line(x, y + w, x + w, y + w); //bottom line: left to right
	
	
	
	if (current == this) {
		fill(100, 255, 100, 150);
		noStroke();
		rect(x, y, w, w)
	} else if (this.visited) {
		fill(255, 50);
		noStroke();
		rect(x, y, w, w)
	}
}

function index(x, y) {
	if (x < 0 || y < 0 || x >= COLS || y >= ROWS)
		return -1;
	return x + y * COLS;
}
