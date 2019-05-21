import React from 'react';
import { Marker } from 'react-map-gl';

import './UserMarker.css';

const UserMarker = ({ latitude, longitude }) => (
  <Marker
    latitude={latitude}
    longitude={longitude}
    offsetTop={-8}
    offsetLeft={-8}
  >
    <div className="UserMarker" />
  </Marker>
);

export default UserMarker;
