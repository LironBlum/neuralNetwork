class Matrix {
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0)); //create a new matrix with zeros
    }
  
    static fromArray(arr) { //creates an input matrix from input
      return new Matrix(arr.length, 1).map((e, i) => arr[i]);
    }
  
    static subtract(a, b) { //calc the error range from wanted result to accual result
      if (a.rows !== b.rows || a.cols !== b.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }
  
      // Return a new Matrix a-b
      return new Matrix(a.rows, a.cols)
        .map((_, i, j) => a.data[i][j] - b.data[i][j]);
    }
  
    toArray() { //return the outputed matrix as an array 
      let arr = [];
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          arr.push(this.data[i][j]);
        }
      }
      return arr;
    }
  
    randomize() {
      return this.map(e => Math.random() * 2 - 1);
    }

   /**
   * @param - scalar or matrix 
   * in case of matrix as param (upper): add matrixes 
   * ! added matrix must have matching cols and rows 
   * in case of scalar as param (lowwer): add scalar to current matrix 
   * @return {Matrix}
   */
    add(n) {
      if (n instanceof Matrix) {
        if (this.rows !== n.rows || this.cols !== n.cols) {
          return;
        }
        return this.map((e, i, j) => e + n.data[i][j]);
      } else {
        return this.map(e => e + n);
      }
    }
  
    static transpose(matrix) {
      return new Matrix(matrix.cols, matrix.rows)
        .map((_, i, j) => matrix.data[j][i]);
    }
  
    static multiply(a, b) {
      // Matrix product
      if (a.cols !== b.rows) {
        console.log('Columns of A must match rows of B.');
        return;
      }
  
      return new Matrix(a.rows, b.cols)
        .map((e, i, j) => {
          // Dot product of values in col
          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          return sum;
        });
    }
  
    multiply(n) {
      if (n instanceof Matrix) {
        if (this.rows !== n.rows || this.cols !== n.cols) {
          return;
        }
        return this.map((e, i, j) => e * n.data[i][j]);
      } else {
        // Scalar product
        return this.map(e => e * n);
      }
    }
    
    /**
     * for reuse operations on matrixes, TODO =rewrite 
     * @param {func}
     * @returns this alternated matrix (current)  
     */
    map(func) {
      // Apply a function to every element of matrix
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let val = this.data[i][j];
          this.data[i][j] = func(val, i, j);
        }
      }
      return this;
    }
  
    /**
     * for reuse operations on matrixes, TODO =rewrite 
     * @param {matrix}  
     * @param {func}  
     * 
     * @returns Matrix, new matrix
     */
    static map(matrix, func) {
      // Apply a function to every element of matrix
      return new Matrix(matrix.rows, matrix.cols)
        .map((e, i, j) => func(matrix.data[i][j], i, j));
    }  

    print() {
      let line = '--'
      for (let i = 0 ; i < this.cols ; ++i){
        line += '------'
      }
    
      console.log(`\n${line}`)
      for (let row = 0; row < this.rows; ++row) {
        process.stdout.write(`|`);
        for (let col = 0; col < this.cols; ++col) {
          process.stdout.write(` ${this.data[row][col].toFixed(1)} |`);
        }
        console.log(`\n${line}`)
      }
    }

    static print(matrix) {
      let line = '--'
      for (let i = 0 ; i < matrix.cols ; ++i){
        line += '------'
      }
    
      console.log(`\n${line}`)
      for (let row = 0; row < matrix.rows; ++row) {
        process.stdout.write(`|`);
        for (let col = 0; col < matrix.cols; ++col) {
          process.stdout.write(` ${matrix.data[row][col].toFixed(1)} |`);
        }
        console.log(`\n${line}`)
      }
      return this;
    }
  }
  
  
  module.exports = Matrix;
