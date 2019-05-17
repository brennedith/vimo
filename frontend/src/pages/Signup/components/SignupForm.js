import React, { useState } from 'react';

import AuthService from '../../../services/AuthService';

const SubmitForm = ({ history }) => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    setIsFormDisabled(true);

    if (!username || !password) {
      // Only visible for old browsers
      setMessage(`Uh? All fields must be filled 😮️.`);
      setIsFormDisabled(false);
    } else if (password !== passwordVerification) {
      setMessage(`Password and verification don't match 🤔️.`);
      setIsFormDisabled(false);
    } else {
      AuthService.signup({
        username,
        password
      })
        .then(({ data: user }) => {
          localStorage.setItem('userId', user._id);
          history.push('/app/feed');
        })
        .catch(({ response: { data: err } }) => {
          setMessage(err.message);
          setIsFormDisabled(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}
      <label>
        Username:{' '}
        <input
          type="text"
          value={username}
          disabled={isFormDisabled}
          required
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Password:{' '}
        <input
          type="password"
          value={password}
          disabled={isFormDisabled}
          required
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <label>
        Retype Password:{' '}
        <input
          type="password"
          value={passwordVerification}
          disabled={isFormDisabled}
          required
          onChange={({ target }) => setPasswordVerification(target.value)}
        />
      </label>
      <button type="submit" disabled={isFormDisabled}>
        Sign up
      </button>
    </form>
  );
};

export default SubmitForm;
