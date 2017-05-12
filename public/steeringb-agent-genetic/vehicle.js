
function Vehicle(x, y) {
	this.pos = createVector(x, y).copy();
	this.vel = glob.velocity.copy();
	this.acc = glob.acceleration.copy();
	this.r = glob.radius;
	this.maxSpeed = glob.maxSpeed;
	this.maxForce = glob.maxForce;
}
// Method to update location
Vehicle.prototype.update = function () {
	// Update vel
	this.vel.add(this.acc);
	// Limit speed
	this.vel.limit(this.maxSpeed);
	//updates position
	this.pos.add(this.vel);
	// Reset accelertion to 0 each cycle
	this.acc.mult(0);
}

Vehicle.prototype.applyForce = function (force) {
	// We could add mass here if we want A = F / M
	this.acc.add(force);
}

Vehicle.prototype.display = function (col) {
	// Draw a triangle rotated in the direction of vel
	var angle = this.vel.heading() + PI / 2;
	fill(col || 127);
	strokeWeight(1);
	push();
	translate(this.pos.x, this.pos.y);
	rotate(angle);
	beginShape();
	vertex(0, -this.r * 2);
	vertex(-this.r, this.r * 2);
	vertex(this.r, this.r * 2);
	endShape(CLOSE);
	pop();
}
