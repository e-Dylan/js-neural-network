
let lr_slider;

let training_data = [
  // XOR Training Data
  {
    inputs: [0, 1],
    targets: [1]
  },
  {
    inputs: [1, 0],
    targets: [1]
  },
  {
    inputs: [0, 0],
    targets: [0]
  },
  {
    inputs: [1, 1],
    targets: [0]
  }

]

function setup() {

  createCanvas(500, 500);
  lr_slider = createSlider(0, 0.5, 0.1, 0.01);

  nn = new NeuralNetwork(2, 4, 1);

  // for (let i = 0; i < 100000; i++) {
  //   data = random(training_data);
  //   nn.train(data.inputs, data.targets);
  // }
  //
  // console.log(nn.feedForward([1, 0]));
  // console.log(nn.feedForward([0, 1]));
  // console.log(nn.feedForward([0, 0]));
  // console.log(nn.feedForward([1, 1]));

}

function draw() {

  background(0);

  let resolution = 10;
  let cols = width / resolution;
  let rows = height / resolution;

  for (let i = 0; i < 300; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }

  nn.setLearningRate(lr_slider.value());

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      // top left is 0, 0: 0 / 30 = 0. 30 / 30 = 1.
      // bottom right is 1, 1: 30 / 30 = 1. 30 / 30 = 1.

      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      let y = nn.feedForward(inputs);
      fill(y * 255);
      noStroke();

      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }

}
