function Particle (x,y) {
	this.pos = createVector(random(width),random(height));
	this.targetPosition = createVector(x,y)
	this.velocity = p5.Vector.random2D();//createVector(0,0);
	this.acceleration = createVector();
	//Position is where it stays
	//velocity is added to positon
	//acceleration is added to velocity
	
	//max magnitues
	this.maxSpeed = 5; //max magnitude
	this.maxForce = 0.3; 
	
	
	this.update = function () {
		//acceleration is based on how far we are from the target
		
		
		this.pos.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.acceleration.mult(0); //clears the acceleration as it is always updated in seek/applyforcce
	}
	
	this.render = function () {
		stroke(255)
		strokeWeight(4)
		point(this.pos.x,this.pos.y)
	}
	
	this.applyBehaviors = function () {
		// var seek = this.seek(this.targetPosition)
		// this.applyForce(seek)
		var mouse = createVector(mouseX,mouseY);
		
		var arrive = this.arrive(this.targetPosition)
		var flee = this.flee(mouse)
		
		arrive.mult(1);
		flee.mult(5); //giving more weight for the flee force
		
		
		this.applyForce(arrive)
		this.applyForce(flee)
	}
	
	this.arrive = function(targetPos) {
		//desired is a vector that points from this.pos to targetPos
		//this way the seek behavior is a behavior that directly influences the acceleration in the direction of the target
		var desired = p5.Vector.sub(targetPos, this.pos)
		var speed = this.maxSpeed;
		var d = desired.mag(); 	//the magnitude of the vetor that points from one pos to other pos is the DISTANCE !!!
		if (d < 100) {
			var speed = map(d,0,100,0,this.maxSpeed); //maniulating the magnitude of the vector, i.e. the speed of the particle
		}
		desired.setMag(speed);
		
		var steer = p5.Vector.sub(desired, this.velocity) //acceleration is later changed to steer so it steers in that direction
		steer.limit(this.maxForce);
		return steer;	
	}
	
	
	
	this.flee = function (targetPos) {
		var desired = p5.Vector.sub(targetPos, this.pos)
		var d = desired.mag();
		if (d < 50) {
			desired.setMag(this.maxSpeed); //constricting the speed of reaching desired position to maxSpeed
			desired.mult(-1)
			var steer = p5.Vector.sub(desired, this.velocity) //velocity is later changed to steer so it steers in that direction
			steer.limit(this.maxForce);
			return steer;
		}
		else return createVector(0,0); // if the distance between this position and the mouse is > 50, dont change acceleration (dont apply the force)
	}
	
	this.applyForce = function (force) {
		this.acceleration.add(force)
	}
}