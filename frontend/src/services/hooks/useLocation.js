import { useState, useEffect } from 'react';

const useLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude, accuracy, speed } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
        setAccuracy(accuracy);
        setSpeed(speed);
      },
      err => console.log(err), //TODO: handle error
      { enableHighAccuracy: true }
    );

    return () => {
      // Clears watchPosition
      navigator.geolocation.clearWatch(watchId);
    };
  });

  return {
    latitude,
    longitude,
    accuracy,
    speed
  };
};

export default useLocation;
