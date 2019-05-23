import React from 'react';

import './PostContent.css';

const PostContent = ({ content, closeContent }) => {
  const { type } = content;

  setTimeout(() => {
    closeContent();
  }, 11000);

  return (
    <article className="PostContent">
      {type === 'text' && (
        <div className="content" style={content.style}>
          <span>{content.text}</span>
        </div>
      )}
      {type === 'photo' && (
        <img className="content" src={content.mediaURL} alt="post" />
      )}
      {type === 'video' && (
        <video className="content" src={content.mediaURL} autoPlay controls />
      )}
    </article>
  );
};

export default PostContent;
