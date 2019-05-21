import React from 'react';

import './AvatarPicture.css';

const AvatarPicture = ({ url }) => (
  <figure
    className="AvatarPicture"
    style={{ backgroundImage: `url(${url})` }}
  />
);

export default AvatarPicture;
