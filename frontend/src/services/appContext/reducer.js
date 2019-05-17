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
          type: action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
