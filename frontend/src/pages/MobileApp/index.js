import React from 'react';
import { Route } from 'react-router';

import NavBar from './components/NavBar';
import Content from './components/Content';

import NewPost from './components/NewPost';
import MapView from './components/MapView';

import { useLocation } from '../../services/customHooks';

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
