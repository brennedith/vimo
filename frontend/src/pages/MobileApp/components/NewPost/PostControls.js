import React, { useContext } from 'react';

import appContext from '../../../../services/context';

import './PostControls.css';

const Controls = ({ handleSend, leftPanel, rightPanel }) => {
  const { state } = useContext(appContext);
  const { speed, accuracy } = state.coords;

  /* TODO: Alert if accuracy is poor or speed too fast*/
  const accuracyCheck = accuracy > 50;
  const speedCheck = speed > 20;
  const buttonStatusClass = accuracyCheck || speedCheck ? 'bad' : 'good';

  return (
    <div className="controls">
      {leftPanel ? leftPanel : <div className="push" />}
      <button
        type="button"
        className={`accuracy-button ${buttonStatusClass}`}
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
