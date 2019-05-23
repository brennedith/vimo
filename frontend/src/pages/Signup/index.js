import React from 'react';

import SignupForm from './components/SignupForm';

import './index.css';

const Signup = ({ history }) => {
  return (
    <section className="auth-form">
      <header>
        <h1 className="title is-1 is-tomato">VIMO</h1>
        <h2 className="subtitle">Join the experience!</h2>
      </header>
      <SignupForm history={history} />
    </section>
  );
};

export default Signup;
