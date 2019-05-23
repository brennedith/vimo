import React, { useState } from 'react';

import AuthService from '../../../services/AuthService';

const LoginForm = ({ history }) => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    setIsFormDisabled(true);

    if (!username || !password) {
      // Only visible for old browsers
      setMessage(`Uh? All fields must be filled. 😮`);
      setIsFormDisabled(false);
    } else {
      AuthService.login({
        username,
        password
      })
        .then(({ data: user }) => {
          localStorage.setItem('userId', user._id);
          history.push('/app');
        })
        .catch(({ response }) => {
          setMessage(`${response.data.message} 😮`);
          setIsFormDisabled(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p className="notification is-light">{message}</p>}
      <label className="label">
        Username:
        <input
          className="input"
          type="text"
          value={username}
          disabled={isFormDisabled}
          required
          minLength={6}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label className="label">
        Password:
        <input
          className="input"
          type="password"
          value={password}
          disabled={isFormDisabled}
          required
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button
        className="button is-link"
        type="submit"
        disabled={isFormDisabled}
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
