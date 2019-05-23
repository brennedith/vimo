import { useEffect, useContext } from 'react';

import PostService from '../PostService';
import appContext from '../context';

const useLocation = () => {
  const { state, dispatch } = useContext(appContext);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude, accuracy, speed } = position.coords;
        const { coords } = state;

        // TODO: Only update location every n' meters
        if (latitude !== coords.latitude && longitude !== coords.longitude) {
          const body = { latitude, longitude };

          dispatch({
            type: 'UPDATE_LOCATION',
            payload: { latitude, longitude, accuracy, speed }
          });

          PostService.getNearby(body).then(({ data: posts }) => {
            dispatch({
              type: 'LOAD_POSTS',
              payload: posts
            });
          });
        }
      },
      err => console.log(err), //TODO: handle error
      { enableHighAccuracy: true }
    );

    return () => {
      // Clears watchPosition
      navigator.geolocation.clearWatch(watchId);
    };
    // eslint-disable-next-line
  }, []); // TODO: Reference github issue
};

export default useLocation;
