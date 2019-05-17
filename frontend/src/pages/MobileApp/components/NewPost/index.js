import React, { useState, useContext } from 'react';

import TypesControl from './TypesControl';
import TextArea from './TextArea';
import Video from './Video';

import appContext from '../../../../services/context';
import PostService from '../../../../services/PostService';

const NewPostForm = () => {
  const { state } = useContext(appContext);
  const { type } = state.post;
  const { latitude, longitude, accuracy } = state.coords; //TODO: Verify accuracy use
  const [message, setMessage] = useState(null);

  const handleSend = content => {
    PostService.create({ content, longitude, latitude, accuracy })
      .then(({ data: post }) => setMessage(post._id))
      .catch(({ response }) => setMessage(response));
  };

  return (
    <>
      {message && <p className="notification is-danger">{message}</p>}
      {type === 'video' && <Video type="video" handleSend={handleSend} />}
      {type === 'text' && <TextArea handleSend={handleSend} />}
      {type === 'photo' && <Video type="photo" handleSend={handleSend} />}
      <TypesControl />
    </>
  );
};

export default NewPostForm;
