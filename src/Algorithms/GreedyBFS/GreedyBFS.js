export function GreedyBFS(grid, startNode, finishNode) {
  const visitedNodeInOrder = [];
  const unVisitedNodes = [];
  setHeuristicValue(startNode, finishNode);
  unVisitedNodes.push(startNode);

  while (unVisitedNodes.length) {
    if (visitedNodeInOrder.length > 1000) return visitedNodeInOrder;

    sortNodesByDistance(unVisitedNodes);
    const closestNode = unVisitedNodes.shift();

    if (closestNode.isWall) continue;

    closestNode.isVisited = true;
    visitedNodeInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodeInOrder;
    updateUnVisitedNeighbors(
      closestNode,
      grid,
      unVisitedNodes,
      finishNode
    );
  }
  return visitedNodeInOrder;
}

function updateUnVisitedNeighbors(
  closestNode,
  grid,
  unVisitedNodes,
  finishNode
) {
  const unVisitedNeighbors = findAdjacentNodes(closestNode, grid);
  setAdjacentNodeDistance(unVisitedNeighbors, finishNode);
  for (const neighbor of unVisitedNeighbors) {
    neighbor.previousNode = closestNode;
    neighbor.isVisited = true;
    unVisitedNodes.push(neighbor);
  }
}

function sortNodesByDistance(unVisitedNodes) {
  unVisitedNodes.sort(
    (nodeA, nodeB) => nodeA.distance - nodeB.distance
  );
}

function findAdjacentNodes(node, grid) {
  const neighbors = [];

  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function setAdjacentNodeDistance(nodeList, finishNode) {
  for (let node of nodeList) {
    setHeuristicValue(node, finishNode);
  }
}

function setHeuristicValue(node, finishNode) {
  const row1 = node.row;
  const col1 = node.col;
  const row2 = finishNode.row;
  const col2 = finishNode.col;

  node.distance =
    node.weight +
    Math.sqrt(
      (row1 - row2) * (row1 - row2) + (col1 - col2) * (col1 - col2)
    );
}
