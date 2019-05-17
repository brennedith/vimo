import React from 'react';
import { Switch, Route } from 'react-router';

import NavBar from './components/NavBar';
import Content from './components/Content';

import Feed from './components/Feed';
import NewPost from './components/NewPost';
import MapView from './components/MapView';
import Friends from './components/Friends';
import Profile from './components/Profile';

import { useLocation } from '../../services/customHooks';

import 'mapbox-gl/dist/mapbox-gl.css';

const MobileApp = () => {
  useLocation();

  return (
    <>
      <Content>
        <Switch>
          <Route path="/app/feed" component={Feed} />
          <Route path="/app/new" component={NewPost} />
          <Route path="/app/map" component={MapView} />
          <Route path="/app/friends" component={Friends} />
          <Route path="/app/profile" component={Profile} />
          <Route component={Feed} />
        </Switch>
      </Content>
      <NavBar />
    </>
  );
};

export default MobileApp;
