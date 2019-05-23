import React, { useContext, useState } from 'react';

import Content from '../Content';
import List from './List';
import Details from './Details';

import appContext from '../../../../services/context';

const Feed = () => {
  const { state } = useContext(appContext);
  const { posts } = state.feed;
  const [activePost, setActivePost] = useState(null);

  const selectPost = post => {
    setActivePost(post);
  };

  return (
    <Content>
      {activePost ? (
        <Details {...activePost} selectPost={selectPost} />
      ) : (
        <List posts={posts} selectPost={selectPost} />
      )}
    </Content>
  );
};

export default Feed;
