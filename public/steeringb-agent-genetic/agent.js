//OOP extension start
function Agent(x, y, _dna) {
	Vehicle.call(this, x, y);
	
	nextAgentID++;
	this.id = nextAgentID;
	
	if (_dna instanceof DNA) {
		this.foodPerceptionLimit = _dna.dna[0];
		this.foodPriority = _dna.dna[1];
		this.poisonPerceptionLimit = _dna.dna[2];
		this.poisonPriority = _dna.dna[3];
		this.dna = _dna;
	} else {
		this.foodPerceptionLimit = random(glob.perceptionLimit.low, glob.perceptionLimit.high);
		this.foodPriority = random(glob.itemPriority.low, glob.itemPriority.high);
		this.poisonPerceptionLimit = random(glob.perceptionLimit.low, glob.perceptionLimit.high);
		this.poisonPriority = random(glob.itemPriority.low, glob.itemPriority.high);
		
		var dna = [
			this.foodPerceptionLimit,
			this.foodPriority,
			this.poisonPerceptionLimit,
			this.poisonPriority
		];
		this.dna = new DNA(dna);
	}
}
Agent.prototype = Object.create(Vehicle.prototype);
Agent.prototype.constructor = Agent;

Agent.prototype.display = function () {
	if (highestHealthAgentId == this.id)
		col = color(255, 255, 0);
	else {
		var red = color(255, 0, 0);
		var green = color(0, 255, 0);
		var col = lerpColor(red, green, this.health);
	}
	
	//call SUPERCLASS in order to draw the shape
	Vehicle.prototype.display.call(this, col);
	
	push();
	translate(this.pos.x, this.pos.y);
	
	if (debug) {
		noFill();
		stroke(255, 0, 0);
		line(0, 0, this.poisonPriority * 50, 0);
		stroke(0, 255, 0);
		line(0, 0, -this.foodPriority * 50, 0);
		
		//draw food perception distance
		stroke(255, 0, 0);
		ellipse(0, 0, this.poisonPerceptionLimit * 2, this.poisonPerceptionLimit * 2);
		stroke(0, 255, 0);
		ellipse(0, 0, this.foodPerceptionLimit * 2, this.foodPerceptionLimit * 2);
	}
	pop();
}
