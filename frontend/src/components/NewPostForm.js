import React, { useState, useEffect } from 'react';

import PostService from '../services/PostService';

const NewPostForm = () => {
  const [content, setContent] = useState('This is a test! :)');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    PostService.create({ content, longitude, latitude, accuracy })
      .then(({ data: post }) => setMessage(post._id))
      .catch(({ response }) => setMessage(response));
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAccuracy(position.coords.accuracy);
      },
      err => console.log(err), //TODO: Handle error
      { enableHighAccuracy: true }
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      {accuracy && (
        <p>
          {latitude} {longitude} {accuracy.toFixed(2)}
        </p>
      )}
      <p>{message}</p>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default NewPostForm;
