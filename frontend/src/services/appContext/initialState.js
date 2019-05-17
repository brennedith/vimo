const initialState = {
  APP_NAME: process.env.REACT_APP_NAME,
  coords: {
    latitude: 0,
    longitude: 0,
    speed: 0,
    accuracy: 0
  },
  map: {
    zoom: 13
  }
};

export default initialState;
