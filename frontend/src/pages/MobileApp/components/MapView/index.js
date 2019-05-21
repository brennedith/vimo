import React, { useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';

import appContext from '../../../../services/context';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

const MapView = () => {
  const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const { state, dispatch } = useContext(appContext);
  const { latitude, longitude } = state.coords;
  const { zoom } = state.map;

  const viewport = {
    width: '100%',
    height: '100%',
    latitude,
    longitude,
    zoom
  };

  const updateZoom = zoom => {
    dispatch({
      type: 'UPDATE_ZOOM',
      payload: zoom
    });
  };

  if (!latitude || !longitude) return null;

  return (
    <div className="MapView" style={{ width: '100%', height: '100%' }}>
      <ReactMapGL
        mapboxApiAccessToken={mapBoxToken}
        reuseMaps
        {...viewport}
        mapStyle={'mapbox://styles/mapbox/streets-v11'}
        onViewportChange={({ zoom }) => updateZoom(zoom)}
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          offsetTop={-8}
          offsetLeft={-8}
        >
          {/*TODO: Add accuracy representation */}
          <div className="UserMarker" />
        </Marker>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <NavigationControl
            onViewportChange={({ zoom }) => updateZoom(zoom)}
          />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default MapView;
