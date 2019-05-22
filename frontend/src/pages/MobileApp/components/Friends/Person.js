import React, { useContext } from 'react';

import FriendsService from '../../../../services/FriendsService';
import appContext from '../../../../services/context';

import './Person.css';

const Person = person => {
  const { state, dispatch } = useContext(appContext);
  const { friends } = state.profile.user;

  const { _id, username, name, image_url } = person;
  const pictureUrl = image_url ? image_url : '/assets/avatar.png';
  const isFriend = friends.some(friend => friend._id === person._id);

  const updateUser = user => {
    dispatch({
      type: 'LOAD_USER',
      payload: user
    });
  };

  const addFriend = id => {
    FriendsService.add(id).then(({ data: user }) => updateUser(user));
  };

  const deleteFriend = id => {
    FriendsService.delete(id).then(({ data: user }) => updateUser(user));
  };

  return (
    <li className="Person">
      <div className="photo">
        <figure
          className="avatar"
          style={{ backgroundImage: `url(${pictureUrl})` }}
        />
      </div>
      <div className="information">
        <p>
          <strong>{username}</strong>
        </p>
        <p>{name}</p>
      </div>
      <div className="options">
        {isFriend ? (
          <button
            type="button"
            className="button is-danger"
            onClick={() => deleteFriend(_id)}
          >
            Unfollow
          </button>
        ) : (
          <button
            type="button"
            className="button is-success"
            onClick={() => addFriend(_id)}
          >
            Follow
          </button>
        )}
      </div>
    </li>
  );
};

export default Person;
