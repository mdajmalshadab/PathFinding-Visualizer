import React from 'react';
import './Node.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AdjustIcon from '@mui/icons-material/Adjust';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';

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
        <KeyboardArrowRightIcon
          id={`rode-${row}-${col}`}
          className='start-icon'
        />
      )}
      {isFinish && (
        <AdjustIcon
          id={`rode-${row}-${col}`}
          className='finish-icon'
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
