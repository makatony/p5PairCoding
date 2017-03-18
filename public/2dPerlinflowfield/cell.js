function Cell(x, y) {
	this.gridPos = {
		x: x,
		y: y
	};
	this.vector = createVector(0,0);
	
}

Cell.prototype.getNeighbours = function () {
	var x = this.gridPos.x;
	var y = this.gridPos.y;
	var neighbours = [];
	
	var top = cells[index(x, y - 1)];
	var right = cells[index(x + 1, y)];
	var bottom = cells[index(x, y + 1)];
	var left = cells[index(x - 1, y)];
	
	neighbours.push(top);
	neighbours.push(right);
	neighbours.push(bottom);
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

Cell.prototype.render = function () {
	var w = CELLWITDH;
	var x = this.gridPos.x;
	var y = this.gridPos.y;
	
	stroke(51);
	noFill();
	// rect(x*w, y*w, w, w);
	push();
	translate(x*w+w/2,y*w+w/2);
	rotate(this.vector.heading());
	line(0,0,w/2,0)
	pop();
}

function index(x, y) {
	if (x < 0 || y < 0 || x >= COLS || y >= ROWS)
		return -1;
	return x + y * COLS;
}
