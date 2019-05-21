import React, { useContext } from 'react';

import appContext from '../../../../services/context';

import './List.css';

const List = () => {
  const { state } = useContext(appContext);
  const { friends } = state.profile.user;

  if (state.profile.status === 'NOT_LOADED') return null;

  return (
    <>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>{friend.name}</li>
        ))}
      </ul>
    </>
  );
};

export default List;
