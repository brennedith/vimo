import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router';

import NavBar from './components/NavBar';
import Content from './components/Content';

import Feed from './components/Feed';
import NewPost from './components/NewPost';
import MapView from './components/MapView';
import Friends from './components/Friends';
import Profile from './components/Profile';

import appContext from '../../services/context';
import PostService from '../../services/PostService';
import { useLocation } from '../../services/customHooks';

const MobileApp = () => {
  const { state, dispatch } = useContext(appContext);
  const { status } = state.feed;

  useLocation();

  useEffect(() => {
    // Loads all sent and received posts
    if (status === 'NOT_LOADED') {
      const receivedPromise = PostService.getReceived();
      const sentPromise = PostService.getSent();

      Promise.all([receivedPromise, sentPromise]).then(([received, sent]) => {
        const receivedPosts = received.data.map(post => {
          post.type = 'received';
          return post;
        });
        const sentPosts = sent.data.map(post => {
          post.type = 'sent';
          return post;
        });
        const posts = [...receivedPosts, ...sentPosts].map(post => {
          post.createdAt = new Date(post.createdAt);
          post.expiry = new Date(post.expiry);
          return post;
        });

        dispatch({
          type: 'LOAD_POSTS',
          payload: {
            status: 'LOADED',
            posts
          }
        });
      });
    }
    // eslint-disable-next-line
  }, []); // TODO: Reference github issue

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
