import React from 'react';

import Post from './Post';

import './List.css';

const List = ({ posts, selectPost }) => {
  /* TODO: Render only when posts change */
  if (posts.length === 0)
    return (
      <div className="List empty">
        <h2 className="subtitle">
          No <span>VIMO</span>s yet,
          <br />
          create a new one in the add{' '}
          <span className="icon">
            <i className="fas fa-plus fa-lg" />
          </span>{' '}
          section
        </h2>
      </div>
    );

  return (
    <>
      {posts.map(post => (
        <Post key={post._id} {...post} selectPost={() => selectPost(post)} />
      ))}
    </>
  );
};

export default List;
