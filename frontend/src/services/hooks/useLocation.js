import { useEffect, useContext } from 'react';

import appContext from '../context';

const useLocation = () => {
  const { dispatch } = useContext(appContext);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude, accuracy, speed } = position.coords;

        dispatch({
          type: 'UPDATE_LOCATION',
          payload: { latitude, longitude, accuracy, speed }
        });
      },
      err => console.log(err), //TODO: handle error
      { enableHighAccuracy: true }
    );

    return () => {
      // Clears watchPosition
      navigator.geolocation.clearWatch(watchId);
    };
  });
};

export default useLocation;
