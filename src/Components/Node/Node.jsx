import React from 'react';
import './Node.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWeightHanging,
  faAngleRight,
  faBullseye,
} from '@fortawesome/free-solid-svg-icons';

function Node({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  weight,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  // Checking and changing color of cell
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : weight > 0
    ? 'node-weight'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={(e) => onMouseDown(e)}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseUp={() => onMouseUp()}
      style={{
        borderLeft:
          col % 4 === 0
            ? '1.6px solid rgb(175, 216, 248)'
            : '1px solid rgb(175, 216, 248)',
        borderTop:
          row % 4 === 0
            ? '1.6px solid rgb(175, 216, 248)'
            : '1px solid rgb(175, 216, 248)',
        borderRight:
          col === 49 ? '1.6px solid rgb(175, 216, 248)' : '',
        borderBottom:
          row === 19 ? '1.6px solid rgb(175, 216, 248)' : '',
      }}
    >
      {isStart && (
        <FontAwesomeIcon
          id={`rode-${row}-${col}`}
          className='start-icon'
          icon={faAngleRight}
        />
      )}
      {isFinish && (
        <FontAwesomeIcon
          id={`rode-${row}-${col}`}
          className='finish-icon'
          icon={faBullseye}
        />
      )}

      {weight > 0 && (
        <FontAwesomeIcon
          id={`weight-${row}-${col}`}
          className='weight-icon'
          icon={faWeightHanging}
        />
      )}
    </div>
  );
}

export default Node;
