import React, { useContext } from 'react';

import appContext from '../../../../services/context';

import './TypesControl.css';

const TypesControl = () => {
  const { state, dispatch } = useContext(appContext);
  const { type: ActiveType } = state.post;

  const changeType = type => {
    dispatch({
      type: 'SWITCH_POST_TYPE',
      payload: type
    });
  };

  const types = ['video', 'text', 'photo'].map((type, index) => (
    <button
      key={index}
      onClick={() => changeType(type)}
      style={{ fontWeight: type === ActiveType ? 'bold' : 'normal' }}
    >
      {type}
    </button>
  ));

  return <div className="types-control">{types}</div>;
};

export default TypesControl;
