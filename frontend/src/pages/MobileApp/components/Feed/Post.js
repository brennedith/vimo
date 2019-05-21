import React from 'react';

import moment from 'moment';

import './Post.css';

const Post = post => {
  const { type, content } = post;

  const sentByUser = type === 'sent';
  const senderPost = sentByUser ? post.to : post.from;
  const sender = senderPost
    ? senderPost.name
      ? senderPost.name
      : senderPost.username
    : 'Public'; // TODO: Change
  const expiry = moment(post.expiry).fromNow();

  let postIcon;
  switch (content.type) {
    case 'video':
      postIcon = 'video';
      break;
    case 'photo':
      postIcon = 'camera';
      break;
    default:
      postIcon = 'font';
      break;
  }

  return (
    <article className="Post">
      <div className="post-content">
        <p>
          {sentByUser ? (
            <span className="fa fa-sign-out-alt out" />
          ) : (
            <span className="fa fa-sign-in-alt in" />
          )}{' '}
          <span className="subtitle">{sender}</span>
        </p>
        <p>
          <small>Expires {expiry}</small>
        </p>
      </div>
      <div className="icon">
        <span className={`fa fa-${postIcon} fa-lg`} />
      </div>
    </article>
  );
};

export default Post;