import React from 'react';

import './PostContent.css';

const PostContent = ({ content, closeContent }) => {
  const { type, frontCamera } = content;

  setTimeout(() => {
    closeContent();
  }, 11000);

  const frontCameraClass = frontCamera ? 'content mirror' : 'content';

  return (
    <article className="PostContent">
      {type === 'text' && (
        <div className={frontCameraClass} style={content.style}>
          <span>{content.text}</span>
        </div>
      )}
      {type === 'photo' && (
        <img className={frontCameraClass} src={content.mediaURL} alt="post" />
      )}
      {type === 'video' && (
        <video className={frontCameraClass} src={content.mediaURL} autoPlay />
      )}
    </article>
  );
};

export default PostContent;
