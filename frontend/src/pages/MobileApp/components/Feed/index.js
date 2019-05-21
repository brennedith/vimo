import React, { useState } from 'react';

import List from './List';

const Feed = () => {
  const [postId, setPostId] = useState(null);
  return <>{postId ? <List /> : <List />}</>;
};

export default Feed;
