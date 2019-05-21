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
      const newPosts = action.payload.posts.map(post => {
        post.type = action.payload.type;
        post.createdAt = new Date(post.createdAt);
        post.expiry = new Date(post.expiry);

        return post;
      });
      const posts = [...state.feed.posts, ...newPosts].sort(
        (a, b) => a.createdAt > b.createdAt
      );

      return {
        ...state,
        feed: {
          posts
        }
      };
    default:
      return state;
  }
};

export default reducer;
