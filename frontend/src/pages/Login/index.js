import React from 'react';

import LoginForm from './components/LoginForm';

import './index.css';

const Login = ({ history }) => {
  return (
    <section className="auth-form">
      <header>
        <h1 className="title is-1 is-tomato">VIMO</h1>
        <h2 className="subtitle">Live the experience!</h2>
      </header>
      <LoginForm history={history} />
    </section>
  );
};

export default Login;
