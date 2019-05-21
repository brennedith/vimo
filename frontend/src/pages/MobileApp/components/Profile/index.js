import React, { useContext, useState } from 'react';

import appContext from '../../../../services/context';

import AvatarPicture from './AvatarPicture';

import './index.css';

const Profile = () => {
  const { state, dispatch } = useContext(appContext);
  const { user } = state.profile;

  return (
    <article className="Profile">
      <AvatarPicture url={user.image_url} />
      <h1 className="title">{user.name}</h1>
    </article>
  );
};

export default Profile;
