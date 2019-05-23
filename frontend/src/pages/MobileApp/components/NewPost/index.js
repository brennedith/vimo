import React, { useState, useContext, useEffect } from 'react';

import TypesControl from './TypesControl';
import TextArea from './TextArea';
import Video from './Video';
import SendTo from './SendTo';
import PostingStatus from './PostingStatus';

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
  const [postSent, setPostSent] = useState(false);

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

      PostService.create(type, body)
        .then(({ data: post }) => {
          setPostSent(true);

          setTimeout(() => {
            setContent(null);
            setAccess(null);
            setPostSent(false);
          }, 800);
        })
        .catch(err => console.log(err.response));
    }
  }, [type, content, access]);

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
    if (!access) {
      setContent(null);
    } else {
      setAccess(access);
    }
  };

  const SendToActive = content ? true : false;
  const PostingStatusActive = access ? true : false;

  return (
    <>
      {type === 'video' && <Video type="video" handleSend={saveContent} />}
      {type === 'text' && <TextArea handleSend={saveContent} />}
      {type === 'photo' && <Video type="photo" handleSend={saveContent} />}
      <TypesControl />
      <SendTo active={SendToActive} handleSend={saveAccess} />
      <PostingStatus active={PostingStatusActive} status={postSent} />
    </>
  );
};

export default NewPostForm;
