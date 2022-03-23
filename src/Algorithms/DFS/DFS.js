var visitedNodeInOrder;
var unVisitedNodes;
var flag;

export function DFS(grid, startNode, finishNode) {
  flag = false;
  visitedNodeInOrder = [];
  unVisitedNodes = {};
  startNode.distance = 0;

  //Creating unVisited Array

  unVisitedNodes = updateUnvisitedNeighbors(
    startNode,
    grid,
    unVisitedNodes
  );

  recurDFS(unVisitedNodes, startNode, finishNode, grid);

  return visitedNodeInOrder;
}

function recurDFS(unVisitedNodes, currNode, finishNode, grid) {
  if (flag) return;

  if (currNode.isWall) {
    currNode.isVisited = true;
    return;
  }
  currNode.isVisited = true;
  visitedNodeInOrder.push(currNode);
  if (currNode === finishNode) {
    flag = true;
    return;
  }

  for (const childNode of unVisitedNodes[
    `node-${currNode.row}-${currNode.col}`
  ]) {
    if (!childNode.isVisited) {
      unVisitedNodes = updateUnvisitedNeighbors(
        childNode,
        grid,
        unVisitedNodes
      );

      recurDFS(unVisitedNodes, childNode, finishNode, grid);
    }
  }
}

function updateUnvisitedNeighbors(node, grid) {
  const unVisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unVisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }

  unVisitedNodes = {
    ...unVisitedNodes,
    [`node-${node.row}-${node.col}`]: unVisitedNeighbors,
  };
  return unVisitedNodes;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];

  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
