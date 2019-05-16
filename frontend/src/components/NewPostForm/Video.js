import React, { useState, useEffect, useRef } from 'react';

import './Video.css';

const Video = () => {
  const videoRef = useRef();
  const [cameras, setCameras] = useState(null);
  const [cameraIndex, setCameraIndex] = useState(null);

  // Registers all available video devices
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.reduce((list, device) => {
        if (device.kind === 'videoinput') {
          return [...list, device.deviceId];
        } else {
          return list;
        }
      }, []);

      setCameras(videoDevices);
      setCameraIndex(0);
    });
  }, []);

  // Switch the video source when the cameraIndex changes
  useEffect(() => {
    if (cameraIndex !== null) {
      const deviceId = cameras ? cameras[cameraIndex] : true;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId
          },
          audio: true
        })
        .then(stream => {
          const video = videoRef.current;
          video.volume = 0;
          video.srcObject = stream;
        });
    }
  }, [cameraIndex]); // TODO: Reference github issue

  if (!cameras) return null;

  // Changes the cameraIndex
  const changeCamera = () => {
    if (cameras.length > 0) {
      setCameraIndex((cameraIndex + 1) % cameras.length);
    }
  };

  // Mirrors the front facing camera, Chrome and Firefox mobile deal with the order of devices differently
  const frontCamera = cameras.length === 0 ? 0 : window.chrome ? 0 : 1;
  const style = {
    transform: cameraIndex === frontCamera ? 'rotateY(-180deg)' : ''
  };

  return (
    <section className="camera">
      <video ref={videoRef} autoPlay style={style} />
      <button onClick={changeCamera} className="camera switch">
        O
      </button>
    </section>
  );
};

export default Video;
