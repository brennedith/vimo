import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';

import './UserMarker.css';

const UserMarker = ({ latitude, longitude }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => setIsActive(!isActive);

  return (
    <>
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetTop={-17}
        offsetLeft={-17}
      >
        <div className="UserMarker" onClick={toggleActive}>
          <span className="fas fa-street-view fa-lg" />
        </div>
      </Marker>
      {isActive && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={false}
          closeOnClick={false}
          offsetTop={-17}
          anchor="bottom"
        >
          <div onClick={toggleActive}>This is your location :)</div>
        </Popup>
      )}
    </>
  );
};

export default UserMarker;
