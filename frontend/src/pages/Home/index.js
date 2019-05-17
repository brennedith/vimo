import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="title">Home</h1>
      <p>
        <Link to="/signup">/signup</Link>
        <br />
        <Link to="/login">/login</Link>
        <br />
        <Link to="/app">/app</Link>
      </p>
    </div>
  );
};

export default Home;
