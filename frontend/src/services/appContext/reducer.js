const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        coords: action.payload
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
      const posts = action.payload;
      const sortedPosts = [...state.feed.posts, ...posts].sort((a, b) => {
        return a.createdAt > b.createdAt;
      });

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
