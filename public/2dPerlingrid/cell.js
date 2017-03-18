function Cell(x, y) {
	this.gridPos = {
		x: x,
		y: y
	};
	this.color = 0;
	
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
	var x = this.gridPos.x * w;
	var y = this.gridPos.y * w;
	
	noStroke();
	fill(floor(this.color));
	rect(x, y, w, w)
}

function index(x, y) {
	if (x < 0 || y < 0 || x >= COLS || y >= ROWS)
		return -1;
	return x + y * COLS;
}
