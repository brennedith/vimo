import React, { useContext } from 'react';

import appContext from '../../../../services/context';

import './PostControls.css';

const Controls = ({ children, handleSend, leftPanel, rightPanel }) => {
  const { state } = useContext(appContext);
  const { speed, accuracy } = state.coords;

  /* TODO: Alert if accuracy is poor */
  const accuracyClass = accuracy > 50 ? 'bad' : 'good';

  return (
    <div className="controls">
      {leftPanel ? leftPanel : <div className="push" />}
      <button
        type="button"
        className={`accuracy-button ${accuracyClass}`}
        onClick={handleSend}
      >
        Place
        <br />
        VIMO
      </button>
      {rightPanel ? rightPanel : <div className="push" />}
    </div>
  );
};

export default Controls;
