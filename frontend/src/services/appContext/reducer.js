import distanceBetweenPoints from '../distanceBetweenPoints';

const distanceBetweenUserAndPost = (user, post) => {
  const userLocation = {
    longitude: user.coords.longitude,
    latitude: user.coords.latitude
  };
  const postLocation = {
    longitude: post.loc.coordinates[0],
    latitude: post.loc.coordinates[1]
  };

  return distanceBetweenPoints(userLocation, postLocation);
};

const sortByDistance = (a, b) => {
  if (a.distance > b.distance) {
    return 1;
  } else if (b.distance > a.distance) {
    return -1;
  } else {
    return 0;
  }
};

const reducer = (state, action) => {
  let posts;
  let sortedPosts;

  switch (action.type) {
    case 'UPDATE_LOCATION':
      posts = state.feed.posts;
      sortedPosts = posts
        .map(post => {
          post.distance = distanceBetweenUserAndPost(state, post);
          return post;
        })
        .sort(sortByDistance);

      return {
        ...state,
        coords: action.payload,
        feed: {
          ...state.feed,
          posts: sortedPosts
        }
      };
    case 'UPDATE_ZOOM':
      return {
        ...state,
        map: {
          zoom: action.payload
        }
      };
    case 'SWITCH_POST_TYPE':
      return {
        ...state,
        post: {
          ...state.post,
          type: action.payload
        }
      };

    case 'LOAD_POSTS':
      posts = action.payload;
      sortedPosts = posts
        .map(post => {
          post.distance = distanceBetweenUserAndPost(state, post);
          return post;
        })
        .sort(sortByDistance);

      return {
        ...state,
        feed: {
          status: 'LOADED',
          posts: sortedPosts
        }
      };
    case 'DELETE_POST':
      const deletedPost = action.payload;
      const filteredPosts = state.feed.posts.filter(
        post => post._id !== deletedPost._id
      );

      return {
        ...state,
        feed: {
          status: 'LOADED',
          posts: filteredPosts
        }
      };
    case 'LOAD_USER':
      return {
        ...state,
        profile: {
          status: 'LOADED',
          user: action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
