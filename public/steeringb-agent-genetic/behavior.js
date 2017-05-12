
Vehicle.prototype.applyBehaviors = function () {
	// this.applyForce(this.seek(createVector(mouseX,mouseY)));
	this.eats();
	this.applyForce(this.seek(this.closestItem(this.foodPerceptionLimit, "foods"), this.foodPriority));
	this.applyForce(this.flee(this.closestItem(this.poisonPerceptionLimit, "poison"), this.poisonPriority));
	this.applyForce(this.boundaries());
}

Vehicle.prototype.boundaries = function () { // by shiffman
	var d = glob.boundaryDistance;
	var desired = null;
	
	if (this.pos.x < d) {
		desired = createVector(this.maxSpeed, this.vel.y);
	} else if (this.pos.x > width - d) {
		desired = createVector(-this.maxSpeed, this.vel.y);
	}
	
	if (this.pos.y < d) {
		desired = createVector(this.vel.x, this.maxSpeed);
	} else if (this.pos.y > height - d) {
		desired = createVector(this.vel.x, -this.maxSpeed);
	}
	
	if (desired !== null) {
		desired.normalize();
		desired.mult(this.maxSpeed);
		
		//force to be applied: steering force is the target place minus velocity
		var forcePriority = glob.forcePriority.boundaries || 1;
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce * forcePriority);
		return steer;
	}
	return createVector(0, 0);
}

Vehicle.prototype.flee = function (_targetPos, _forcePriority) {
	if (_targetPos == undefined)
		return createVector(0, 0);
	
	//desired is a vector that points from this.pos to targetPos
	var desired = p5.Vector.sub(_targetPos, this.pos);
	// var d = desired.mag();
	// desired.setMag(this.maxSpeed); //constricting the speed of reaching desired position to maxSpeed
	desired.mult(-1);
	
	var forcePriority = _forcePriority || glob.forcePriority.seek || 1;
	var steer = p5.Vector.sub(desired, this.velocity); //velocity is later changed to steer so it steers in that direction
	steer.limit(this.maxForce * forcePriority);
	return steer;
}

Vehicle.prototype.seek = function (_targetPos, _forcePriority) { //generic
	if (_targetPos == undefined)
		return createVector(0, 0);
	//desired is a vector that points from this.pos to targetPos
	//this way the seek behavior is a behavior that directly influences the acceleration in the direction of the target
	var desired = p5.Vector.sub(_targetPos, this.pos);
	
	var forcePriority = _forcePriority || glob.forcePriority.seek || 1;
	var steer = p5.Vector.sub(desired, this.vel); //acceleration is later changed to steer so it steers in that direction
	steer.limit(this.maxForce * forcePriority);
	return steer;
}

Vehicle.prototype.closestItem = function (_perceptionLimit, itemType) {
	var vehiclePos = this.pos;
	var lowestDistance = _perceptionLimit || Infinity;
	var closestItem = undefined;
	
	if (itemType == "foods")
		var items = foods;
	else
		var items = poisons;
	
	items.some(function (item) { //check which is the closest food source
		var thisDistance = vehiclePos.dist(item);
		if (thisDistance < lowestDistance) {
			closestItem = item;
			lowestDistance = thisDistance;
		}
	});
	return closestItem;
}

Vehicle.prototype.eats = function () {
	var vehiclePos = this.pos;
	
	for (var i = foods.length - 1; i >= 0; i--) {
		var d = vehiclePos.dist(foods[i]);
		if (d < glob.eatDistance) {
			foods.splice(i, 1);
			this.health += glob.nutrition.food;
		}
	}
	
	for (var i = poisons.length - 1; i >= 0; i--) {
		var d = vehiclePos.dist(poisons[i]);
		if (d < glob.eatDistance) {
			poisons.splice(i, 1);
			this.health += glob.nutrition.poison;
		}
	}
}
