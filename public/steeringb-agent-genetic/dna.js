
function DNA(dna) {
	this.dna = dna;
}

DNA.prototype.mutation = function () {
	var outputDNA = [];
	for (var i = 0; i < this.dna.length; i++) {
		var randomChance = random(1); //random between 0 and 1. used to see if we will do a mutation at all
		var randomChange = 1;
		if (randomChance < glob.mutationRate)
			randomChange = random(1) + 0.5; // random between 0.5 and 1.5. change in mutation
		outputDNA[i] = this.dna[i] * randomChange;
	}
	return outputDNA; //array
}

DNA.prototype.crossing = function (_secondDNA) {
	var secondDNA = (_secondDNA instanceof DNA?_secondDNA.dna:_secondDNA);
	var outputDNA = [];
	var randomDivision = 0;
	for (var i = 0; i < this.dna.length; i++) {
		var randomDivision = random(1);
		outputDNA[i] = this.dna[i] * randomDivision + secondDNA[i] * (1 - randomDivision);
	}
	return outputDNA; //array
}
