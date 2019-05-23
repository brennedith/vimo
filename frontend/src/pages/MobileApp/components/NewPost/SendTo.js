import React, { useState, useContext } from 'react';

import appContext from '../../../../services/context';

import './SendTo.css';

const initialState = { public: false };

const SendTo = ({ active, handleSend }) => {
  const { state } = useContext(appContext);
  const { friends } = state.profile.user;

  const [localState, setLocalState] = useState(initialState);

  const handleChecked = ({ target }) => {
    const { name, checked } = target;

    setLocalState({
      ...localState,
      [name]: checked
    });
  };

  const sendAccess = () => {
    const access = Object.keys(localState);

    handleSend(access);
    setLocalState(initialState);
  };

  const activeClass = active ? 'active' : '';

  if (!friends) return null;
  return (
    <article className={`SendTo ${activeClass}`}>
      <div className="options">
        <h1 className="subtitle">Who can access this VIMO?</h1>
        <button className="button is-tomato" type="button" onClick={sendAccess}>
          Save
        </button>
      </div>
      <ul>
        <li>
          <label className="checkbox" disabled>
            <input
              type="checkbox"
              name="public"
              checked={state.public}
              onChange={handleChecked}
            />
            <span>
              <em>Make it public</em>
            </span>
          </label>
        </li>
        {friends.map(friend => {
          const { _id, name, username } = friend;
          const displayName = name ? name : username;
          const checked = localState[_id] || false;

          return (
            <li key={_id}>
              <label className="checkbox" disabled>
                <input
                  type="checkbox"
                  name={_id}
                  checked={checked}
                  onChange={handleChecked}
                />
                <span>{displayName}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default SendTo;
