import React, { useContext } from 'react';

import Post from './Post';

import appContext from '../../../../services/context';

const List = () => {
  const { state } = useContext(appContext);
  const { posts } = state.feed;

  /* TODO: Render only when posts change */
  return (
    <>
      {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </>
  );
};

export default List;
