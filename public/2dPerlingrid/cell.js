function Cell(x, y) {
	this.gridPos = {
		x: x,
		y: y
	};
	this.color = color(0,0,0);
	
}

Cell.prototype.getNeighbours = function () {
	var x = this.gridPos.x;
	var y = this.gridPos.y;
	var neighbours = [];
	
	var top = cells[indx(x, y - 1)];
	var right = cells[indx(x + 1, y)];
	var bottom = cells[indx(x, y + 1)];
	var left = cells[indx(x - 1, y)];
	
	if (top) neighbours.push(top);
	if (right) neighbours.push(right);
	if (bottom) neighbours.push(bottom);
	if (left) neighbours.push(left);
	return neighbours;
}

Cell.prototype.getRandomNeighbour = function () {
	var neighbours = this.getNeighbours();
	if (neighbours.length > 0)
		return neighbours[floor(Math.random() * neighbours.length)];
	else
		return undefined;
}

Cell.prototype.getIndex = function () {
	return indx(this.gridPos.x,this.gridPos.y);
}

Cell.prototype.getDist = function (cell) {
	//manhattan distance
	var manhattan = abs(this.gridPos.x-cell.gridPos.x) + abs(this.gridPos.y-cell.gridPos.y);
	//euclidean distance
	var euclidean = dist(this.gridPos.x, this.gridPos.y, cell.gridPos.x, cell.gridPos.y);
	// return manhattan *.8 + euclidean *.2;
	return manhattan;
	// return euclidean;
}

Cell.prototype.render = function (color) {
	var col = color || this.color;
	var w = CELLWITDH;
	var x = this.gridPos.x * w;
	var y = this.gridPos.y * w;
	
	noStroke();
	fill(col);
	rect(x, y, w, w)
}

function indx(x, y) {
	if (x < 0 || y < 0 || x >= COLS || y >= ROWS)
		return -1;
	return x + y * COLS;
}
