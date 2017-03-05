var streams = [];

function preload() {
}
function setup() {
	createCanvas(700,500);
	background(51);
	textSize(20);
	fill(255);
	
	for (var i = 0; i < 50; i++) {
		var size = random(10)+5;
		var velocity = createVector(0,random(1)+1)
		var stream = new Stream(size,velocity,map(i,0,50,0,width),0);
		streams.push(stream);
	}
}

function draw() {
	background(51);

	for (var i = 0; i < streams.length; i++) {
			streams[i].update();
			streams[i].render();
		}
  
}

function Stream(size,vel,x,y) {
	this.size = size;
	this.characters = [];
	this.pos = createVector(x,y);
	this.vel = vel;
	for (var i = 0; i < this.size; i++) {
		this.characters[i] = round(random(9));
	}
	
	this.update = function () {
		this.randomizeCharacters();
		this.pos.add(this.vel);
	}
	
	this.render = function () {
		for (var i = 0; i < this.characters.length; i++) {
			text(this.characters[i],this.pos.x,this.pos.y+i*20);
		}
		
	}
	
	this.randomizeCharacters = function () {
		for (var i = 0; i < this.size; i++) {
			if (frameCount % 50 == round(random(50))) this.characters[i] = round(random(9));
		}
	}
}