import React from 'react';
import { Route } from 'react-router';

import NewPost from './NewPost';
import NavBar from '../components/MobileApp/NavBar';
import Content from '../components/MobileApp/Content';

const MobileApp = () => {
  return (
    <>
      <Content>
        <Route path="/app/new" component={NewPost} />
      </Content>
      <NavBar />
    </>
  );
};

export default MobileApp;
