import React, { useContext } from 'react';
import ReactMapGL from 'react-map-gl';

import Content from '../Content';
import MapControls from './MapControls';
import UserMarker from './UserMarker';
import PostMarker from './PostMarker';

import appContext from '../../../../services/context';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

const MapView = () => {
  const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const { state, dispatch } = useContext(appContext);
  const { zoom } = state.map;
  const { latitude, longitude } = state.coords;
  const { posts } = state.feed;

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

  const postsMarkers = posts.map(post => (
    <PostMarker key={post._id} {...post} />
  ));

  return (
    <Content>
      <div className="MapView">
        <ReactMapGL
          mapboxApiAccessToken={mapBoxToken}
          mapStyle={'mapbox://styles/mapbox/streets-v11'}
          reuseMaps
          {...viewport}
          onViewportChange={({ zoom }) => updateZoom(zoom)}
        >
          {postsMarkers}
          <UserMarker latitude={latitude} longitude={longitude} />
          <MapControls updateZoom={updateZoom} />
        </ReactMapGL>
      </div>
    </Content>
  );
};

export default MapView;
