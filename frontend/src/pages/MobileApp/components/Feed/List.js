import React from 'react';

import Post from './Post';

const List = ({ posts, selectPost }) => {
  /* TODO: Render only when posts change */
  return (
    <>
      {posts.map(post => (
        <Post key={post._id} {...post} selectPost={() => selectPost(post)} />
      ))}
    </>
  );
};

export default List;
