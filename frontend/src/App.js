import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </Router>
  );
};

export default App;
