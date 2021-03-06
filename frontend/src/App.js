import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { ContextProvider } from './services/context';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MobileApp from './pages/MobileApp';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/app" component={MobileApp} />
      </Router>
    </ContextProvider>
  );
};

export default App;
