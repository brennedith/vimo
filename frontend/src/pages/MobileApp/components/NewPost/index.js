import React, { useState, useContext, useEffect } from 'react';

import TypesControl from './TypesControl';
import TextArea from './TextArea';
import Video from './Video';
import SendTo from './SendTo';

import appContext from '../../../../services/context';
import PostService from '../../../../services/PostService';

import './index.css';

const NewPostForm = () => {
  const { state } = useContext(appContext);
  const { type } = state.post;
  const { latitude, longitude, accuracy } = state.coords;
  // Post information
  const [content, setContent] = useState(null);
  const [access, setAccess] = useState(null);

  useEffect(() => {
    if (content && access) {
      let body;

      if (type === 'text') {
        body = {
          to: access,
          ...content
        };
      } else {
        body = content;
        body.append('to', access);
      }

      console.log(body);

      // PostService.create(type, body)
      //   .then(({ data: post }) => console.log(post))
      //   .catch(({ response }) => console.log(response));
      setContent(null);
      setAccess(null);
    }
  }, [content, access]);

  const saveContent = content => {
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

    setContent(body);
  };

  const saveAccess = access => {
    setAccess(access);
  };

  const SendToActive = content ? true : false;
  const StatusActive = access ? true : false;

  return (
    <>
      {type === 'video' && <Video type="video" handleSend={saveContent} />}
      {type === 'text' && <TextArea handleSend={saveContent} />}
      {type === 'photo' && <Video type="photo" handleSend={saveContent} />}
      <TypesControl />
      <SendTo active={SendToActive} handleSend={saveAccess} />
    </>
  );
};

export default NewPostForm;
