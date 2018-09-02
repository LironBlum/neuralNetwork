const NeuralNetwork = require('../models/nn')
const Matrix = require('../models/matrix')

exports.brain = (req, res) => {
	let nn = new NeuralNetwork(2, 4, 1);
	let training_data = [{
		inputs: [0, 0],
		outputs: [0]
	  },
	  {
		inputs: [0, 1],
		outputs: [1]
	  },
	  {
		inputs: [1, 0],
		outputs: [1]
	  },
	  {
		inputs: [1, 1],
		outputs: [0]
	  }
	];
  
	//training
	for (let i = 0; i < 1; i++) {
		let randIndex = Math.floor(Math.random() * (training_data.length))
		let data = training_data[randIndex]	
	  nn.train(data.inputs, data.outputs);
	}
  
	nn.setLearningRate(); //default is set to 0.1
  console.log('================================= results =====================================')
	console.log(`[0,0] should return 0, accual returned: ${nn.predict([0,0])}`)
	console.log(`[1,0] should return 1, accual returned: ${nn.predict([1,0])}`)
	console.log(`[0,1] should return 1, accual returned: ${nn.predict([0,1])}`)
	console.log(`[1,1] should return 0, accual returned: ${nn.predict([1,1])}`)
	
	res.status(200).json({ brain: `finished` });
};



