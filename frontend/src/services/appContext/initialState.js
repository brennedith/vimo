const initialState = {
  APP_NAME: process.env.REACT_APP_NAME,
  coords: {
    latitude: 19.432608, //CDMX Zocalo
    longitude: -99.133209, //CMDX Zocalo
    speed: 0,
    accuracy: 0
  },
  map: {
    zoom: 13
  }
};

export default initialState;
