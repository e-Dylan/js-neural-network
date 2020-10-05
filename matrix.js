
//var m = new Matrix(3, 2);

class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  static subtract(a, b) {
    // return a new matrix, a - b
    // matrix a = matrix of guesses (1 column)
    // maxtrix b = matrix of correct answers (1 column)

    let result = new Matrix(a.rows, a.cols);

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // does every column, then goes to next row
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

randomize() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = Math.floor(Math.random() * 2 - 1);
    }
  }
}

add(n) {
  if (n instanceof Matrix) {
    // if input is a matrix, add matrices element-wise
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += n.data[i][j];
      }
    }
  } else {
    // if input is a scalar, add single scalar to each element
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += n;
      }
    }
  }
}

static transpose(matrix) {
  //instance, creates and returns a new matrix with transposed rows/cols;
  let result = new Matrix(matrix.cols, matrix.rows);
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.cols; j++) {
      result.data[j][i] = matrix.data[i][j];
    }
  }
  return result;
}

static multiply(a, b) {
  // matrix product (dot product);
  if (a.cols !== b.rows) {
    console.log("Columns of Matrix A must match rows of Matrix B.");
    return undefined;
  }

  // multiplies each column by each row of matrix a and b
  // elementA * corresponding elementB + elementA * corresponding element B = element C

  let result = new Matrix(a.rows, b.cols); // correct size matrix - rowsA, colsB.
  for (let i = 0; i < result.rows; i++) {
    for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      // filling dot product values in new result matrix;
      }
    }
    return result;
  }

  multiply(n) {

    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
    // scalar product multiplication
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  }

  static map(matrix, func) {
    let result = new Matrix(matrix.rows, matrix.cols);
    // apply a function to every element of matrix;
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let val = matrix.data[i][j];
        result.data[i][j] = func(val);
      }
    }
    return result;
  }

  map(func) {
    // apply a function to each element in the Matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val)
      }
    }
  }

  print() {
    console.table(this.data);
  }

}
