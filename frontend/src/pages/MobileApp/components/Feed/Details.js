import React, { useContext, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import moment from 'moment';

import PostMarker from '../MapView/PostMarker';
import UserMarker from '../MapView/UserMarker';

import PostService from '../../../../services/PostService';
import appContext from '../../../../services/context';

import './Details.css';

const Details = post => {
  const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const { state, dispatch } = useContext(appContext);
  const { type, content } = post;

  const userLocation = state.coords;

  const sentByUser = type === 'sent';
  const senderPost = sentByUser ? post.to : post.from;
  const sender = senderPost
    ? senderPost.name
      ? senderPost.name
      : senderPost.username
    : 'Public'; // TODO: Change
  const expiry = moment(post.expiry).fromNow();
  const [longitude, latitude] = post.loc.coordinates;
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '50vh',
    latitude,
    longitude,
    zoom: 11
  });

  let postIcon;
  switch (content.type) {
    case 'video':
      postIcon = 'video';
      break;
    case 'photo':
      postIcon = 'camera';
      break;
    default:
      postIcon = 'font';
      break;
  }

  const onViewportChange = viewport => setViewport(viewport);

  const deletePost = id => {
    PostService.delete(id).then(({ data: post }) => {
      dispatch({
        type: 'DELETE_POST',
        payload: post
      });
    });

    goBack();
  };

  const goBack = () => {
    post.selectPost(null);
  };

  return (
    <article className="PostDetails">
      <header>
        <div>
          <h1 className="title">{sender}</h1>
          <h2 className="subtitle">Expires {expiry}</h2>
        </div>
        <div>
          <h1 className="title">
            <span className={`fa fa-${postIcon} fa-lg`} />
          </h1>
        </div>
      </header>
      <main>
        <ReactMapGL
          mapboxApiAccessToken={mapBoxToken}
          mapStyle={'mapbox://styles/mapbox/streets-v11'}
          reuseMaps
          {...viewport}
          onViewportChange={onViewportChange}
        >
          <UserMarker {...userLocation} />
          <PostMarker {...post} />
        </ReactMapGL>
      </main>
      <footer>
        <button type="button" className="button is-link">
          Open
        </button>
        {sentByUser && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => deletePost(post._id)}
          >
            Delete
          </button>
        )}
        <button type="button" className="button is-dark" onClick={goBack}>
          Go back
        </button>
      </footer>
    </article>
  );
};

export default Details;
