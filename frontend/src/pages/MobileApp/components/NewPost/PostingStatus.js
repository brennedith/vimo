import React from 'react';

import './PostingStatus.css';

const PostingStatus = ({ active, status }) => {
  const activeClass = active ? 'active' : '';

  return (
    <article className={`PostingStatus ${activeClass}`}>
      {status ? (
        <div>
          <h1 className="title is-1 sent">
            <span className="fa fa-thumbtack" />
          </h1>
          <h1 className="title is-1">VIMO Saved!</h1>
        </div>
      ) : (
        <h1 className="title is-1 sending">Saving VIMO</h1>
      )}
    </article>
  );
};

export default PostingStatus;
