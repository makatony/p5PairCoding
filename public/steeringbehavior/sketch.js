var font;
var particles = [];

function preload() {
		font = loadFont('AvenirNextLTPro-Demi.otf');
}
function setup() {
	createCanvas(600,300);
	background(51);
	textFont(font);	
	stroke(255);
	strokeWeight(4)
	
	var points = font.textToPoints("tony",160,200,160);
	
	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		var particle = new Particle(pt.x,pt.y)
		particles.push(particle);
	}
}

function draw() {
	background(51);
	for (var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		particle.applyBehaviors();
		particle.update();
		particle.render();
		
	}
  
}