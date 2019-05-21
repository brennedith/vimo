import React from 'react';
import { NavigationControl } from 'react-map-gl';

import './MapControls.css';

const MapControls = ({ updateZoom }) => (
  <div className="MapControls">
    <NavigationControl onViewportChange={({ zoom }) => updateZoom(zoom)} />
  </div>
);

export default MapControls;
