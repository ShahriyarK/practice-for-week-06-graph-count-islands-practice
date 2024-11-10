function getNeighbors(row, col, matrix) {
  const neighbors = [];
  const possibleNeighbors = [
    [row - 1, col], //top
    [row - 1, col + 1], //top right
    [row, col + 1], //right
    [row + 1, col + 1], //bottom right
    [row + 1, col], //bottom
    [row + 1, col - 1], //bottom left
    [row, col - 1], //left
    [row - 1, col - 1], //top left
  ];
  possibleNeighbors.forEach((node) => {
    const [row, col] = node;
    if (matrix[row] !== undefined && matrix[row][col] !== undefined && matrix[row][col] === 1) {
      neighbors.push(node);
    }
  });
  // Return neighbors
  return neighbors;
}

function countIslands(matrix) {
  // Create a visited set to store visited nodes
  const visited = new Set();
  // Initialize count to 0
  let count = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // Iterate through all indices in matrix
      const stringifiedNode = `${row}, ${col}`;
      if (matrix[row][col] === 1 && !visited.has(stringifiedNode)) {
        // If an index contains a 1 and has not been visited,
        count++;
        // increment island count and start traversing neighbors
        // DO THE THING (increment island count by 1)
        const stack = [[row, col]];
        // Initialize a stack with current index
        visited.add(getStringifiedNode([row, col]));
        // Add stringified version of current index to the visited set
        while (stack.length > 0) {
          // While stack contains elements
          const currentNode = stack.pop();
          // Pop element from stack
          // Get valid neighbors of current element
          const neighbors = getNeighbors(
            currentNode[0],
            currentNode[1],
            matrix
          );
          for (let node of neighbors) {
            // Iterate over neigbors
            if (visited.has(getStringifiedNode(node))) continue;
            // If neighbor has not been visited
            stack.push(node);
            // Add neighbor to stack
            // Mark neighbor as visited
            visited.add(getStringifiedNode(node));
          }
        }
      }
    }
  }
  // Return island count
  return count;
  // Your code here
}

const getStringifiedNode = (node) => {
  const [row, col] = node;
  return `${row}, ${col}`;
};

// Uncomment the lines below for local testing
const matrix = [
                [1,1,1,0,0],
                [0,1,1,0,1],
                [0,1,1,0,1]
              ]

console.log(getNeighbors(1, 1, matrix)); // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
console.log(getNeighbors(2,4, matrix)) // [[1,4]]

const matrix2 = [
                    [1,1,1,0,1],
                    [0,0,0,0,1],
                    [1,0,0,1,0],
                ]

console.log(countIslands(matrix)) // 2
console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];
