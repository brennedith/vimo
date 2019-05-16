import React, { useState } from 'react';

import TextArea from './TextArea';
import Video from './Video';

import { useLocation } from '../../../services/customHooks';
import PostService from '../../../services/PostService';

const NewPostForm = () => {
  const { latitude, longitude, accuracy, speed } = useLocation();
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('text'); // [text, photo, video, audio]

  const handleSend = content => {
    PostService.create({ content, longitude, latitude, accuracy })
      .then(({ data: post }) => setMessage(post._id))
      .catch(({ response }) => setMessage(response));
  };

  return (
    <>
      {message && <p className="notification is-danger">{message}</p>}
      {type === 'text' && (
        <TextArea handleSend={content => handleSend(content)} />
      )}
      {type === 'video' && <Video />}
    </>
  );
};

export default NewPostForm;