import React from 'react';
import { Route } from 'react-router';

import NavBar from '../components/MobileApp/NavBar';
import Content from '../components/MobileApp/Content';

import NewPost from '../components/MobileApp/NewPost';
import MapView from '../components/MobileApp/MapView';

import { useLocation } from '../services/customHooks';

import 'mapbox-gl/dist/mapbox-gl.css';

const MobileApp = () => {
  useLocation();

  return (
    <>
      <Content>
        <Route path="/app/new" component={NewPost} />
        <Route path="/app/map" component={MapView} />
      </Content>
      <NavBar />
    </>
  );
};

export default MobileApp;
