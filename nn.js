
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
   // derivitive of sigmoid(x);
   //return sigmoid(x) * (1 - sigmoid(x));

   // output has already been passed through sigmoid in neuralnet,
   // dont need to return sigmoided x;
   return y * (1 - y);
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();

    this.learning_rate = 0.2;
  }

  feedForward(input_array) {

    // Generating Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output.toArray();
  }

  train(input_array, target_array) {

    // guess given by neural network

    let inputs = Matrix.fromArray(input_array);

    // Generating Hidden nodes outputs
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function
    hidden.map(sigmoid);

    // Generating Outputs nodes outputs
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);

    // convert outputs array to matrix object
    let targets = Matrix.fromArray(target_array);

// TAKING FINAL OUTPUTS, CALCULATING DELTA WEIGHTS
// ΔWij (HO) = lr * Error_output_matrix * dsigmoid(outputs) * H(T)
// ΔWij (IH) = lr * Error_hidden_matrix * dsigmoid(hidden_outputs) * I(T)

    // ΔWij (HO) = lr * Error_output_matrix * dsigmoid(output_outputs) * H(T);

    // calculating error of output nodes from target
    let output_errors = Matrix.subtract(targets, outputs);
    // calculating gradient -> taking error matrix, element-wise adjusting by finding derivative, and multiplying each by lr
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);


    // calculate delta weights;
    // changing hidden matrix from 1 column vector to 1 row matrix so we can dotproduct to find changed weights
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
    // Adjusting Hidden->Output Weights by Deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjusting Hidden->Output Biases by Gradients
    this.bias_o.add(gradients);


    // ΔWij (IH) = lr * Error_hidden_matrix * dsigmoid(hidden_outputs) * I(T)

    // calculate the hidden layer errors;
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // calculating the hidden layer gradients
    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    //calculating input->hidden delta weights
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    // adjusting weights by adding their calcualted deltas
    this.weights_ih.add(weight_ih_deltas);
    // adjusting input->hidden biases by their gradients (deltas)
    this.bias_h.add(hidden_gradient);

  }

  setLearningRate(n) {
    if (this.learning_rate != n) {
      this.learning_rate = n;
      console.log("Setting learning rate to: " + n);
    }
  }

}
