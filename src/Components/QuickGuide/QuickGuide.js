import { React, useState } from 'react';
import './QuickGuide.css';
import quickGuideContent from './QuickGuideContent';
import appDemo from '../../Images/app-demo.mp4';
var i = 0;

export function showTutorial() {
  document.getElementById('tutorial').style.display = 'flex';
}
function QuickGuide() {
  const [guide, setGuide] = useState({
    title: quickGuideContent[0].title,
    subTitle: quickGuideContent[0].subTitle,
    content: quickGuideContent[0].content,
    imgURL: quickGuideContent[0].img,
  });

  function changeContent(typeOfOperation) {
    if (
      i === quickGuideContent.length - 1 &&
      typeOfOperation === 'next'
    )
      return;
    if (i === 0 && typeOfOperation === 'prev') return;
    i = typeOfOperation === 'next' ? i + 1 : i - 1;

    setGuide(() => {
      return {
        title: quickGuideContent[i].title,
        subTitle: quickGuideContent[i].subTitle,
        content: quickGuideContent[i].content,
        imgURL: quickGuideContent[i].img,
      };
    });
  }

  function skipTutorial() {
    document.getElementById('tutorial').style.display = 'none';
  }

  return (
    <div id='tutorial' className='quickGuide-bg'>
      <div className='quickGuide'>
        <div className='quickGuide-heading'>
          <p>{i + 1}/8</p>
          <h1>{guide.title}</h1>
          <h2>{guide.subTitle}</h2>
          <h3 id='content'>
            {i === 3 ? (
              <span>
                <span style={{ fontWeight: 'bold' }}>
                  Dijkstra's Algorithm
                </span>{' '}
                (weighted): the father of pathfinding algorithms;
                guarantees the shortest path.
                <br /> <br />
                <span style={{ fontWeight: 'bold' }}>
                  Greedy Best-first Search
                </span>{' '}
                (weighted): a faster, greedy method which used
                heuristic value to find path, does not guarantee the
                shortest path <br /> <br />
                <span style={{ fontWeight: 'bold' }}>
                  Breath-first Search
                </span>{' '}
                (unweighted): a great algorithm; guarantees the
                shortest path <br /> <br />
                <span style={{ fontWeight: 'bold' }}>
                  Depth-first Search{' '}
                </span>{' '}
                (unweighted): a very bad algorithm for pathfinding;
                does not guarantee the shortest path"
              </span>
            ) : (
              guide.content
            )}
            {i === 7 && (
              <a
                style={{ textDecoration: 'none' }}
                href='https://github.com/mdajmalshadab/PathFinding-Visualizer'
              >
                {' '}
                github
              </a>
            )}
          </h3>
        </div>
        <div className='quickGuide-img'>
          {i != 3 && i != 4 && i != 6 && i != 7 && (
            <img
              className='quickGuide-image-svg'
              src={guide.imgURL}
              alt='guide'
            />
          )}
          {i === 4 && (
            <video className='appDemo-video' autoPlay loop muted>
              <source src={appDemo} type='video/mp4' />
            </video>
          )}

          {i === 6 && (
            <img
              style={{ width: '90%' }}
              src={guide.imgURL}
              alt='guide'
            />
          )}
        </div>
        <div className='quickGuide-btn'>
          <div>
            <button
              className='nav-btn'
              onClick={() => skipTutorial()}
            >
              Skip Tutorial
            </button>
          </div>
          <div>
            <button
              className='nav-btn'
              onClick={() => changeContent('prev')}
            >
              Previous
            </button>
            {i != 7 && (
              <button
                className='nav-btn'
                onClick={() => changeContent('next')}
              >
                Next
              </button>
            )}
            {i === 7 && (
              <button
                className='nav-btn'
                onClick={() => skipTutorial()}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickGuide;
