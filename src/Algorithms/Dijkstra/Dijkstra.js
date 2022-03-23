// Implementation of Dijkstra's Algorithm

export function Dijkstra(grid, startNode, finishNode) {
  const visitedNodeInOrder = [];
  startNode.distance = 0;

  //Creating unVisited Array
  const unVisitedNodes = getAllNodes(grid);

  var cnt = 0;
  while (unVisitedNodes.length) {
    // Step 1: Pick the min value Node which is unprocessed;
    sortNodesByDistance(unVisitedNodes);

    const closestNode = unVisitedNodes.shift();

    // console.log(++cnt);
    // => Case1: if we encounter a wall
    if (closestNode.isWall) continue;
    // console.log(visitedNodeInOrder);
    // => Case2: If closest node is at infinity (we must be trapped from all sides)
    // We need to stop
    if (closestNode.distance === Infinity) return visitedNodeInOrder;

    // Step 2: Mark the node processed/visited
    closestNode.isVisited = true;
    visitedNodeInOrder.push(closestNode);

    // if we reach the target node
    if (closestNode === finishNode) return visitedNodeInOrder;

    // Step 3: Update all adjacent Nodes
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function updateUnvisitedNeighbors(node, grid) {
  const unVisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unVisitedNeighbors) {
    const nodeDistance = node.distance + node.weight + 1;
    if (neighbor.distance > nodeDistance) {
      neighbor.distance = nodeDistance;
      neighbor.previousNode = node;
    }
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

function sortNodesByDistance(unVisitedNodes) {
  unVisitedNodes.sort(
    (nodeA, nodeB) => nodeA.distance - nodeB.distance
  );
}

function getAllNodes(grid) {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];

  let currentNode = finishNode;
  while (currentNode != null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
