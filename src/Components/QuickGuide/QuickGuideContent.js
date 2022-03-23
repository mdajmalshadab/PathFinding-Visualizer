import algo from '../../Images/algo.png';
import editMode from '../../Images/edit-mode.png';
import navBarOptions from '../../Images/nav-bar.png';
const quickGuideContent = [
  {
    title: 'Welcome to Pathfinding Visualizer!',
    subTitle:
      'This short tutorial will walk you through all of the features of this application.',
    content:
      'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
    img: 'https://us.123rf.com/450wm/yupiramos/yupiramos1811/yupiramos181112806/127515004-blind-man-character-icon-vector-illustration-design.jpg?ver=6',
  },
  {
    title: 'What is a pathfinding algorithm?',
    subTitle:
      'At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!',
    content:
      'All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.',
    img: 'https://us.123rf.com/450wm/madmaxer/madmaxer1611/madmaxer161100008/65705129-3d-illustration-of-map-and-pins-route-planning-concept.jpg',
  },
  {
    title: 'Picking an algorithm',
    subTitle:
      'Choose an algorithm from the "Algorithms" drop-down list.',
    content:
      'Note that some algorithms are unweighted, while others are weighted. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path.',
    img: algo,
  },
  {
    title: 'Meet the algorithms',
    subTitle: 'Not all algorithms are created equal!',
    content:
      "Dijkstra's Algorithm (weighted): the father of pathfinding algorithms; guarantees the shortest path. \n Greedy Best-first Search (weighted): a faster, greedy method which used heuristic value to find path, does not guarantee the shortest path \n Breath-first Search (unweighted): a great algorithm; guarantees the shortest path \n Depth-first Search (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path",
    img: '',
  },
  {
    title: 'Adding walls and weights',
    subTitle:
      'Click and drag pointer on the grid to add a wall. Click on the "Add Weight" option to add a weights same way. Hold Ctrl + mouse left click over the walls and weights to remove them.',
    content:
      'Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. They are simply more "costly" to move through. In this application, moving through a weight node has a "cost" of 15.',
    img: '',
  },
  {
    title: 'Changing Start and Target Node position',
    subTitle:
      "Click on 'Edit Mode' dropdown from the top navbar, select which node you want to move.",
    content:
      'Click on the empty space of the grid where you want to position Start / Target Node. Note that you need to exit the edit mode from drop down to add walls and weights further.',
    img: editMode,
  },
  {
    title: 'Visualizing and more',
    subTitle:
      'Use the navbar buttons to visualize algorithms and to do other stuff!',
    content:
      'You can clear the current path, clear walls and weights, clear the entire board, all from the navbar. If you want to access this tutorial again, click on "Pathfinding Visualizer" in the top left corner of your screen.',
    img: navBarOptions,
  },
  {
    title: 'Enjoy!',
    subTitle:
      'I hope you have just as much fun playing around with this visualization tool as I had building it!',
    content:
      'If you want to see the source code for this application, check out my github',
    img: '',
  },
];

export default quickGuideContent;
