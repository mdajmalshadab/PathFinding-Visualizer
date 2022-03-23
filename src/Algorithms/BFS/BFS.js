export function BFS(grid, startNode, finishNode) {
  const visitedNodeInOrder = [];
  startNode.distance = 0;

  //Creating unVisited Array
  const unVisitedNodes = [];
  unVisitedNodes.push(startNode);

  while (unVisitedNodes.length) {
    const nextNode = unVisitedNodes.shift();

    if (nextNode.isWall) continue;

    nextNode.isVisited = true;
    visitedNodeInOrder.push(nextNode);

    // if we reach the target node
    if (nextNode === finishNode) return visitedNodeInOrder;

    // Step 3: Update all adjacent Nodes
    updateUnvisitedNeighbors(nextNode, grid, unVisitedNodes);
  }
  return visitedNodeInOrder;
}

function updateUnvisitedNeighbors(node, grid, unVisitedNodes) {
  const unVisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unVisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    neighbor.isVisited = true;
    unVisitedNodes.push(neighbor);
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];

  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
