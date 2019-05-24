import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';

import './PostMarker.css';

const PostMarker = post => {
  const [isActive, setIsActive] = useState(false);

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
  const toggleActive = () => setIsActive(false);

  return (
    <>
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetTop={-15}
        offsetLeft={-15}
      >
        <div className="PostMarker" onClick={toggleActive}>
          <span className={`fa fa-${postIcon}`} />
        </div>
      </Marker>
      {isActive && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={false}
          closeOnClick={false}
          offsetTop={-15}
          anchor="bottom"
        >
          <div onClick={toggleActive}>POST</div>
        </Popup>
      )}
    </>
  );
};

export default PostMarker;
