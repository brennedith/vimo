import React, { useContext, useState, useEffect } from 'react';

import appContext from '../../../../services/context';

import AvatarPicture from './AvatarPicture';

import './index.css';

const Profile = () => {
  const { state, dispatch } = useContext(appContext);
  const { user } = state.profile;

  const [name, setName] = useState('');
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    if (editForm && user.name) {
      setName(user.name);
    }
  }, [editForm]);

  const switchEdit = () => setEditForm(!editForm);

  return (
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
              <input className="file-input" type="file" name="resume" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">Upload picture</span>
              </span>
            </label>
          </div>
          <button className="button is-link" type="button">
            Update Profile
          </button>
        </>
      ) : (
        <h1 className="title">{user.name}</h1>
      )}
    </article>
  );
};

export default Profile;
