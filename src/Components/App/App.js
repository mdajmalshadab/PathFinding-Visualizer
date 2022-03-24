import './App.css';
import PathFindingVisualizer from '../PathFindingVisualizer/PathFindingVisualizer';

function App() {
  return (
    <div className='App'>
      <PathFindingVisualizer />
      <div className='mobile-devices'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Line-style-icons-laptop.svg/1008px-Line-style-icons-laptop.svg.png'
          alt=''
        />
        <h1>
          This app is not compatible for mobile devices <br />
          <br />
          For Best Experience, Use desktop.
        </h1>
      </div>
    </div>
  );
}

export default App;
