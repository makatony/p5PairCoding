
var v;
var glob = {};
var foods = [];
var poisons = [];
var agents = [];
var nextAgentID = 0;
var debug = false;
var highestHealthAgentId = 0;

function setup() {
	glob = { //global default values
		boundaryDistance: 10,
		acceleration: createVector(0, 0),
		velocity: createVector(5, 4),
		radius: 4,
		maxSpeed: 2,
		maxForce: 0.15,
		forcePriority: { // priority of the force tells how much to limit the force. e.g. 1.3 > 1, so boundaries will be respected more
			boundaries: 1.3,
			seek: 1
		},
		eatDistance: 5,
		initHealth: 1,
		healthDecrease: -0.002,
		nutrition: {
			food: 0.2,
			poison: -0.75
		},
		perceptionLimit: {
			low: 20,
			high: 100
		},
		itemPriority: {
			low: 0.1,
			high: 2
		},
		addFoodRate: random(0.01,0.05),
		addPoisonRate: random(0.002,0.01),
		mutationRate: 0.5,
		init: {
			vehicles: Math.floor(random(30,50)),
			items: Math.floor(random(70,100))
		}
	}
	
	createCanvas(800, 600);
	
	var cb = createCheckbox("debug").changed(function () {
			debug = this.checked();
		});
	var div = createDiv().addClass("stats");
	
	Vehicle.prototype.health = glob.initHealth;
	
	for (var i = 0; i < glob.init.vehicles; i++) {
		agents.push(new Agent(random(width), random(height)));
	}
	
	for (var i = 0; i < glob.init.items; i++) {
		foods.push(createVector(random(width), random(height)));
		poisons.push(createVector(random(width), random(height)));
	}
	
	setInterval(evolution, 10000);
	setInterval(showStats, 1000);
	
}

function draw() {
	background(51);
	
	// Call the appropriate steering behaviors for our agents
	for (var i = agents.length - 1; i >= 0; i--) {
		var agent = agents[i];
		agent.health += glob.healthDecrease;
		
		if (agent.health <= 0) {
			foods.push(createVector(agent.pos.x, agent.pos.y));
			agents.splice(i, 1);
		} else {
			agent.applyBehaviors();
			agent.update();
			agent.display();
		}
	}
	
	//adds random food
	if (random(1) < glob.addFoodRate)
		foods.push(createVector(random(width), random(height)));
	//adds random poison
	if (random(1) < glob.addPoisonRate)
		poisons.push(createVector(random(width), random(height)));
	
	foods.some(function (item) {
		fill(0, 255, 0);
		noStroke();
		ellipse(item.x, item.y, 5, 5);
	});
	poisons.some(function (item) {
		fill(255, 0, 0);
		noStroke();
		ellipse(item.x, item.y, 5, 5);
	});
}




// ###########################
// #### Genetic Algorithm ####
// ###########################


function evolution() {
	if (agents.length >= 2) {
		mating();
		console.log("mating!")
	} else if (agents.length == 1) {
		cloneAgent(agents[0]);
		console.log("cloning!")
	}
}

function mating() {
	agentsSorted = sortAgents();
	
	//highest healths (fitness function)
	var agent1 = agentsSorted[agentsSorted.length - 1];
	var agent2 = agentsSorted[agentsSorted.length - 2];
	
	var newDNA = new DNA(agent1.dna.crossing(agent2.dna));
	newDNA.dna = newDNA.mutation();
	var newAgent = new Agent(random(width), random(height), newDNA);
	newAgent.health = (agent1.health+agent2.health)/2;
	agents.push(newAgent);
}

function cloneAgent(agent) {
	var newDNA = new DNA(agent.dna.mutation());
	var newAgent = new Agent(random(width), random(height), newDNA);
	newAgent.health = agent.health;
	agents.push(newAgent);
}

function sortAgents() {
	var agentsSorted = agents.slice(0); //creating a copy of the array
	agentsSorted.sort(function (a, b) {
		return a.health - b.health;
	});
	return agentsSorted;
}

function showStats() {
	agentsSorted = sortAgents();
	var text = "";
	select(".stats").html(text);
	agentsSorted.some(function (item) {
		var newText = "agentId: " + item.id + "\t (Health: " + round(item.health * 10) / 10 + ") [";
		for (var i = 0; i < item.dna.dna.length; i++) {
			newText = newText + round(item.dna.dna[i] * 10) / 10 + " / "
		}
		text = newText + "]<br>" + text;
	});
	text = "AddFoodRate: "+round(glob.addFoodRate * 1000) / 1000+"<br>"+text;
	text = "AddPoisonRate: "+round(glob.addPoisonRate * 1000) / 1000+"<br>"+text;
	text = "Init food/poison amount: "+round(glob.init.items * 1000) / 1000+"<br>"+text;
	text = "Init vehicles amount: "+round(glob.init.vehicles * 1000) / 1000+"<br>"+text;
	select(".stats").html(text);
	
	if (agentsSorted.length > 0) highestHealthAgentId = agentsSorted[agentsSorted.length-1].id;
}
