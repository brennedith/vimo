import React from 'react';
import { Marker } from 'react-map-gl';

import './PostMarker.css';

const PostMarker = post => {
  const [longitude, latitude] = post.loc.coordinates;
  const { content } = post;

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

  // TODO: User profile photo
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div className="PostMarker">
        <span className={`fa fa-${postIcon}`} />
      </div>
    </Marker>
  );
};

export default PostMarker;
