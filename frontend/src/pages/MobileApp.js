import React from 'react';
import { Route } from 'react-router';

import NavBar from '../components/MobileApp/NavBar';
import Content from '../components/MobileApp/Content';
import NewPost from '../components/MobileApp/NewPost';

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
