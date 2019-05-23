import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

const Home = ({ history }) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    history.push('/app');
  }

  return (
    <div className="Home">
      <h1 className="title is-1 is-tomato">VIMO</h1>
      <h2 className="subtitle">(Public Beta)</h2>
      <p className="auth">
        <Link className="button is-dark" to="/signup">
          Signup
        </Link>
        <span>or</span>
        <Link className="button is-light" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Home;
