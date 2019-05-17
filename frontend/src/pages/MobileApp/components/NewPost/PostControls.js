import React, { useContext } from 'react';

import appContext from '../../../../services/context';

import './PostControls.css';

const Controls = ({ children, handleSend }) => {
  const { state } = useContext(appContext);
  const { speed, accuracy } = state.coords;

  const accuracyClass = accuracy > 50 ? 'bad' : 'good';

  return (
    <div className="controls">
      <div className="push">
        {/* TODO: Decide to show or not the accuracy */}
        <p>Accuracy:</p>
        <p>{accuracy.toFixed()} mts</p>
      </div>
      <button
        type="button"
        className={`accuracy-button ${accuracyClass}`}
        onClick={handleSend}
      >
        Place
        <br />
        VIMO
      </button>
      {children}
    </div>
  );
};

export default Controls;
