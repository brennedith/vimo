import React, { useState } from 'react';

import AuthService from '../services/AuthService';

const LoginForm = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    AuthService.login({
      username,
      password
    })
      .then(user => {
        localStorage.setItem('userId', user._id);
        history.push('/feed'); //TODO: Change to after login route
      })
      .catch(err => setMessage(err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}
      <label>
        Username:{' '}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Password:{' '}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
