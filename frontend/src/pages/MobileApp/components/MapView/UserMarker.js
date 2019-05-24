import React from 'react';
import { Marker } from 'react-map-gl';

import './UserMarker.css';

const UserMarker = ({ latitude, longitude }) => (
  <Marker
    latitude={latitude}
    longitude={longitude}
    offsetTop={-17}
    offsetLeft={-17}
  >
    <div className="UserMarker">
      <span className="fas fa-street-view fa-lg" />
    </div>
  </Marker>
);

export default UserMarker;
