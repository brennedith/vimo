import React, { useState } from 'react';

import TextArea from './TextArea';
import Video from './Video';

import { useLocation } from '../../services/customHooks';
import PostService from '../../services/PostService';

const NewPostForm = () => {
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState('This is a test! :)');
  const { latitude, longitude, accuracy, speed } = useLocation();

  const handleSubmit = e => {
    e.preventDefault();

    PostService.create({ content, longitude, latitude, accuracy })
      .then(({ data: post }) => setMessage(post._id))
      .catch(({ response }) => setMessage(response));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {message && <p className="notification is-danger">{message}</p>}
      {/* <TextArea
        value={content}
        onChange={({ target }) => setContent(target.value)}
      /> */}
      <Video />
      <button className="button is-fullwidth is-primary" type="submit">
        Add VIMO
      </button>
      <div>
        <p className="has-text-info">
          longitude: {longitude}
          <br />
          latitude: {latitude}
          <br />
          accuracy: {accuracy}
          <br />
          speed: {speed}
          <br />
        </p>
      </div>
    </form>
  );
};

export default NewPostForm;
