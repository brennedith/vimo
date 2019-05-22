import React, { useContext } from 'react';

import TypesControl from './TypesControl';
import TextArea from './TextArea';
import Video from './Video';

import appContext from '../../../../services/context';
import PostService from '../../../../services/PostService';

const NewPostForm = () => {
  const { state } = useContext(appContext);
  const { type } = state.post;
  const { latitude, longitude, accuracy } = state.coords;

  const handleSend = content => {
    let body;

    if (type === 'text') {
      body = {
        type,
        longitude,
        latitude,
        accuracy,
        content
      };
    } else {
      body = new FormData();
      body.append('type', type);
      body.append('longitude', longitude);
      body.append('latitude', latitude);
      body.append('accuracy', accuracy);
      body.append('media', content.media);
      body.append('frontCamera', content.frontCamera);
    }

    PostService.create(type, body)
      .then(({ data: post }) => console.log(post))
      .catch(({ response }) => console.log(response));
  };

  return (
    <>
      {type === 'video' && <Video type="video" handleSend={handleSend} />}
      {type === 'text' && <TextArea handleSend={handleSend} />}
      {type === 'photo' && <Video type="photo" handleSend={handleSend} />}
      <TypesControl />
    </>
  );
};

export default NewPostForm;
