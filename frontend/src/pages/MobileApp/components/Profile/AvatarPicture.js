import React from 'react';

import './AvatarPicture.css';

const AvatarPicture = ({ url }) => {
  const pictureUrl = url ? url : '/assets/avatar.png';

  return (
    <figure
      className="AvatarPicture"
      style={{ backgroundImage: `url(${pictureUrl})` }}
    />
  );
};

export default AvatarPicture;
