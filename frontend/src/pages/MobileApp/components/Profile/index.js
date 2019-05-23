import React, { useContext, useState, useEffect, useRef } from 'react';

import Content from '../Content';
import AvatarPicture from './AvatarPicture';

import ProfileService from '../../../../services/ProfileService';
import appContext from '../../../../services/context';

import './index.css';

const Profile = () => {
  const { state, dispatch } = useContext(appContext);
  const { user } = state.profile;

  const [name, setName] = useState('');
  const avatarRef = useRef();

  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    if (editForm && user.name) {
      setName(user.name);
    }
  }, [editForm, user]);

  const switchEdit = () => setEditForm(!editForm);

  const updateProfile = () => {
    const body = new FormData();
    const avatarFile = avatarRef.current.files[0];

    if (name) body.append('name', name);
    if (avatarFile) body.append('avatar', avatarFile);

    ProfileService.update(body).then(({ data: user }) => {
      dispatch({
        type: 'LOAD_USER',
        payload: user
      });

      switchEdit();
    });
  };

  return (
    <Content>
      <article className="Profile">
        <div className="options">
          {editForm ? (
            <button type="button" onClick={switchEdit}>
              <span className={`fa fa-times fa-lg`} />
            </button>
          ) : (
            <button type="button" onClick={switchEdit}>
              <span className={`fa fa-user-edit fa-lg`} />
            </button>
          )}
        </div>
        <AvatarPicture url={user.image_url} />
        {editForm ? (
          <>
            <label className="label">
              Name
              <input
                className="input"
                type="text"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </label>
            <div className="file">
              <label className="file-label">
                <input className="file-input" type="file" ref={avatarRef} />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Upload picture</span>
                </span>
              </label>
            </div>
            <button
              className="button is-link"
              type="button"
              onClick={updateProfile}
            >
              Update Profile
            </button>
          </>
        ) : (
          <h1 className="title">{user.name}</h1>
        )}
      </article>
    </Content>
  );
};

export default Profile;
