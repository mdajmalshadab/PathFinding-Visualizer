import React, { Component } from 'react';
import './PathFindingVisualizer.css';
import Node from '../Node/Node';
import {
  Dijkstra,
  getNodesInShortestPathOrder,
} from '../../Algorithms/Dijkstra/Dijkstra';

import { animateAlgo } from '../../Algorithms/Dijkstra/animateDijkstra';
import { GreedyBFS } from '../../Algorithms/GreedyBFS/GreedyBFS';
import { BFS } from '../../Algorithms/BFS/BFS';
import { DFS } from '../../Algorithms/DFS/DFS';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AdjustIcon from '@mui/icons-material/Adjust';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import QuickGuide, { showTutorial } from '../QuickGuide/QuickGuide';

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 35;

var visitedNode;
var shortestPathNode;

export default class PathFindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      editModeStart: false,
      editModeFinish: false,
      isWeight: false,
      isWall: true,
    };
  }

  getSubstringRow(str) {
    var flag = false;
    var row = '';
    for (const c of str) {
      if (flag && c != '-') row += c;
      if (c === '-') flag = !flag;
    }
    return row;
  }
  getSubstringCol(str) {
    var col = '';
    str = str.split('').reverse().join('');
    for (const c of str) {
      if (c === '-') break;
      col += c;
    }
    col = col.split('').reverse().join('');
    return col;
  }

  ///////////////////////////////////////// Handle Mouse Events //////////////////////////////////////////////////

  //////////////////////////////////////// handle mouse down
  handleMouseDown(e) {
    // console.log('MOUSE DOWN!!!');

    var elementId = '';

    if (e.target.tagName === 'path') {
      elementId = e.target.parentElement.parentElement.id;
    } else {
      elementId = e.target.id;
    }

    const { grid, editModeStart, editModeFinish, isWeight, isWall } =
      this.state;
    const row = Number(this.getSubstringRow(elementId));
    const col = Number(this.getSubstringCol(elementId));
    const currNode = grid[row][col];

    var typeOfWeight = '';
    if (isWeight) typeOfWeight = 'weight';
    else if (isWall) typeOfWeight = 'wall';

    if (
      !currNode.isStart &&
      !currNode.isFinish &&
      !editModeFinish &&
      !editModeStart &&
      typeOfWeight != ''
    ) {
      this.handleWeight(e, currNode, typeOfWeight, elementId);
      this.setState({ mouseIsPressed: true });
    } else if (editModeStart) {
      if (grid[row][col].isFinish) return;

      // repositioning Start Node
      grid[START_NODE_ROW][START_NODE_COL].isStart = false;
      currNode.isStart = true;
      START_NODE_ROW = row;
      START_NODE_COL = col;
    } else if (editModeFinish) {
      if (grid[row][col].isStart) return;

      // repositioning Finish Node
      grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = false;
      currNode.isFinish = true;
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
    }
  }

  ////////////////////////////////////// Handle Mouse Enter
  handleMouseEnter(e) {
    if (!this.state.mouseIsPressed) return;

    var elementId = '';
    // console.log(e.target);
    if (e.target.tagName === 'path') {
      elementId = e.target.parentElement.parentElement.id;
    } else {
      elementId = e.target.id;
    }

    const { grid, isWeight, isWall } = this.state;
    const row = Number(this.getSubstringRow(elementId));
    const col = Number(this.getSubstringCol(elementId));
    const currNode = grid[row][col];

    var typeOfWeight;
    if (isWeight) typeOfWeight = 'weight';
    else if (isWall) typeOfWeight = 'wall';

    if (
      !currNode.isStart &&
      !currNode.isFinish &&
      typeOfWeight != ''
    ) {
      this.handleWeight(e, currNode, typeOfWeight, elementId);
    }
  }

  ///////////////////////////////////////// Handle Weight

  handleWeight(e, currNode, typeOfWeight, elementId) {
    // console.log(elementId);
    if (typeOfWeight === 'wall') {
      if (e.ctrlKey) {
        currNode.isWall = false;

        document.getElementById(elementId).className = 'node';
      } else {
        currNode.isWall = true;

        document.getElementById(elementId).className =
          'node node-wall';
      }
    } else if (typeOfWeight === 'weight') {
      if (e.ctrlKey) {
        currNode.weight = 0;
        currNode.isWall = false;
        document.getElementById(elementId).className = 'node';
      } else {
        currNode.weight = 10;
        currNode.isWall = false;
        document.getElementById(elementId).className =
          'node node-weight';
      }
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  ///////////////////////////////////////////////////// Dijkstra's Algorithm ///////////////////////////////////////

  visualizeDijkstra() {
    this.clearPattern(false);
    this.closeEditMode();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder =
      getNodesInShortestPathOrder(finishNode);
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);

    visitedNode = visitedNodesInOrder;
    shortestPathNode = nodesInShortestPathOrder;

    // Enabling Edit Mode Wall After the End of Animation
    setTimeout(() => {
      this.setState({
        isWall: true,
      });
    }, visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50);
  }

  //////////////////////////////////////////////////// Greedy BFS //////////////////////////////////////////////

  visualizeGreedyBFS() {
    this.clearPattern(false);
    this.closeEditMode();

    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = GreedyBFS(
      grid,
      startNode,
      finishNode
    );

    const nodesInShortestPathOrder =
      getNodesInShortestPathOrder(finishNode);
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);

    // Enabling Edit Mode Wall After the End of Animation
    setTimeout(() => {
      this.setState({
        isWall: true,
      });
    }, visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50);
  }

  /////////////////////////////////////////////// Breadth First Search Algo ///////////////////////////////////////
  visualizeBFS() {
    this.clearPattern(false);
    this.closeEditMode();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);

    const nodesInShortestPathOrder =
      getNodesInShortestPathOrder(finishNode);
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);

    visitedNode = visitedNodesInOrder;
    shortestPathNode = nodesInShortestPathOrder;

    // Enabling Edit Mode Wall After the End of Animation
    setTimeout(() => {
      this.setState({
        isWall: true,
      });
    }, visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50);
  }

  //////////////////////////////////////////////// Depth First Search Algo ///////////////////////////////////////////

  visualizeDFS() {
    this.clearPattern(false);
    this.closeEditMode();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = DFS(grid, startNode, finishNode);

    const nodesInShortestPathOrder =
      getNodesInShortestPathOrder(finishNode);
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);

    visitedNode = visitedNodesInOrder;
    shortestPathNode = nodesInShortestPathOrder;

    // Enabling Edit Mode Wall After the End of Animation
    setTimeout(() => {
      this.setState({
        isWall: true,
      });
    }, visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50);
  }
  componentDidMount() {
    const grid = CreateInitialGrid();
    this.setState({ grid });
  }

  ///////////////////////////////////////////////////// Clear Path Method //////////////////////////////////////

  clearPattern(clearWall, clearWeight) {
    const { grid } = this.state;

    var rowNum = 0;
    for (const row of grid) {
      var col = 0;
      for (const node of row) {
        if (!clearWall && !clearWeight) {
          if (!node.isWall) {
            document.getElementById(
              `node-${node.row}-${node.col}`
            ).className = 'node';
          }
        } else {
          if (clearWall)
            document.getElementById(
              `node-${node.row}-${node.col}`
            ).className = 'node';
          if (clearWeight) {
            if (node.weight > 0) {
              document
                .getElementById(`weight-${node.row}-${node.col}`)
                .setAttribute('class', 'hidden');
            }
          }
        }

        node.isStart =
          rowNum === START_NODE_ROW && col === START_NODE_COL;
        node.isFinish =
          rowNum === FINISH_NODE_ROW && col === FINISH_NODE_COL;
        node.distance = Infinity;
        node.isVisited = false;
        node.isWall = clearWall ? false : node.isWall;
        node.weight = clearWeight ? 0 : node.weight;
        node.previousNode = null;

        col++;
      }
      rowNum++;
    }
    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = 'node node-start';

    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
    ).className = 'node node-finish';
  }

  setStartPoint() {
    this.setState({
      editModeFinish: false,
      editModeStart: true,
    });
  }
  setFinishPoint() {
    this.setState({
      editModeFinish: true,
      editModeStart: false,
    });
  }
  exitEditMode() {
    this.setState({
      editModeFinish: false,
      editModeStart: false,
    });
  }

  setWeightState() {
    this.setState({
      isWall: !this.state.isWall,
      isWeight: !this.state.isWeight,
      editModeFinish: false,
      editModeStart: false,
    });
    const text = document.getElementById('weight-btn-id').innerHTML;
    if (text === 'Add Weight')
      document.getElementById('weight-btn-id').innerHTML = 'Add Wall';
    else
      document.getElementById('weight-btn-id').innerHTML =
        'Add Weight';
  }
  closeEditMode() {
    this.setState({
      isWall: false,
      isWeight: false,
      editModeFinish: false,
      editModeStart: false,
    });
  }

  visualizeAlgo() {
    const e = document.getElementById('algorithm');
    const typeOfAlgo = e.value;

    if (typeOfAlgo === 'Dijkstra') this.visualizeDijkstra();
    else if (typeOfAlgo === 'Greedy') this.visualizeGreedyBFS();
    else if (typeOfAlgo === 'BFS') this.visualizeBFS();
    else if (typeOfAlgo === 'DFS') this.visualizeDFS();
  }

  executeEditMode() {
    const e = document.getElementById('edit-mode');
    const editType = e.value;
    document.getElementById('edit-mode').style.width = '140px';
    if (editType === 'Start') this.setStartPoint();
    else if (editType === 'Finish') this.setFinishPoint();
    else if (editType === 'Exit') this.exitEditMode();
  }

  changeAlgoDescription() {
    const e = document.getElementById('algorithm');
    const typeOfAlgo = e.value;
    document.getElementById('algorithm').style.width = '170px';
    if (typeOfAlgo === 'Dijkstra') {
      document.getElementById('desc').innerHTML =
        "Dijkstra's Algorithm is <span class = 'highlighted'>weighted</span> and <span class = 'highlighted'> guarantees</span> the shortest path!";

      // Design

      document.getElementById('weight-id').className = '';
      document.getElementById('weight-btn-id').disabled = false;
      this.setState({ isWeight: false, isWall: true });
    } else if (typeOfAlgo === 'Greedy') {
      document.getElementById('desc').innerHTML =
        "Greedy Best-first Search is <span class = 'highlighted'>weighted</span> and <span class = 'highlighted'> does not guarantee</span> the shortest path!";

      // Design
      document.getElementById('algorithm').style.width = '200px';
      document.getElementById('weight-id').className = '';
      document.getElementById('weight-btn-id').disabled = false;
      this.setState({ isWeight: false, isWall: true });
    } else if (typeOfAlgo === 'BFS') {
      document.getElementById('desc').innerHTML =
        "Breadth-first Search is <span class = 'highlighted'>un-weighted</span> and <span class = 'highlighted'> guarantees</span> the shortest path!";
      this.clearPattern(false, true);

      // Design
      document.getElementById('weight-id').className =
        'disable-weight';
      document.getElementById('weight-btn-id').disabled = true;
      document.getElementById('weight-btn-id').innerHTML =
        'Add Weight';
      this.setState({ isWeight: false, isWall: true });
    } else if (typeOfAlgo === 'DFS') {
      document.getElementById('desc').innerHTML =
        "Depth-first Search is <span class = 'highlighted'>un-weighted</span> and <span class = 'highlighted'> does not guarantee</span> the shortest path!";
      this.clearPattern(false, true);

      //Design
      document.getElementById('weight-id').className =
        'disable-weight';
      document.getElementById('weight-btn-id').disabled = true;
      document.getElementById('weight-btn-id').innerHTML =
        'Add Weight';
      this.setState({ isWeight: false, isWall: true });
    }
  }

  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div className='path-finding'>
        <div className='header'>
          <h1 onClick={() => showTutorial()}>
            Path Finding Visualizer
          </h1>
          {/* Algorithms Drop Down  */}
          <select
            id='algorithm'
            name='Algorithms'
            className='drop-down'
            onChange={() => this.changeAlgoDescription()}
          >
            <option selected disabled hidden value='algo'>
              Algorithms
            </option>
            <option value='Dijkstra'> Dijkstra's Algorithm </option>
            <option value='Greedy'>Greedy Best First Search</option>
            <option value='BFS'>Breadth-First Search</option>
            <option value='DFS'>Depth-First Search</option>
          </select>

          {/* Edit Mode Drop Down  */}
          <select
            id='edit-mode'
            onChange={() => this.executeEditMode()}
            className='drop-down'
          >
            <option selected disabled hidden value='algo'>
              Edit Mode
            </option>
            <option value='Start'>Set Start Point</option>
            <option value='Finish'>Set Finish Point</option>
            <option value='Exit'>Exit Edit Mode</option>
          </select>

          {/* Other Buttons  */}
          <button
            className='visualize-btn'
            onClick={() => this.visualizeAlgo()}
          >
            Visualize
          </button>
          <button onClick={() => this.clearPattern(false)}>
            Clear Path
          </button>

          <button onClick={() => this.clearPattern(true, true)}>
            Clear Wall & Weights
          </button>

          <button
            id='weight-btn-id'
            onClick={() => this.setWeightState()}
          >
            Add Weight
          </button>
        </div>

        {/* Legends header  */}

        <div className='legends'>
          <div className='legends-element'>
            <KeyboardArrowRight className='start-icon' />
            <h3>Start Node</h3>
          </div>
          <div className='legends-element'>
            <AdjustIcon className='finish-icon' />
            <h3>Target Node</h3>
          </div>
          <div className='legends-element'>
            <FontAwesomeIcon
              className='weight-icon'
              icon={faWeightHanging}
            />
            <h3 id='weight-id'>Weight Node</h3>
          </div>
          <div className='legends-element'>
            <div className='node node-unvisited-legend'></div>
            <h3>Unvisited Node</h3>
          </div>
          <div className='legends-element'>
            <div className='node node-visited-1'></div>
            <h3>Visited Node</h3>
          </div>
          <div className='legends-element'>
            <div className='path-node'></div>
            <h3>Path Node</h3>
          </div>
          <div className='legends-element'>
            <div className='node node-wall'></div>
            <h3>Path Node</h3>
          </div>
        </div>

        {/* Algorithm Description */}
        <h3 className='desc-heading' id='desc'>
          Pick an Algorithm to Visualize!
        </h3>

        {/* Quick Guide */}

        <div>
          <QuickGuide />
        </div>

        <div className='grid'>
          {grid.map((row, rowIdx) => {
            return (
              <div className='grid-row' key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    weight,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      weight={weight}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(e) => this.handleMouseDown(e)}
                      onMouseEnter={(e) => this.handleMouseEnter(e)}
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// creating Initial Grid
export function CreateInitialGrid() {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(CreateNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
}

// creating properties of each cell

function CreateNode(row, col) {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    weight: 0,
    previousNode: null,
  };
}
