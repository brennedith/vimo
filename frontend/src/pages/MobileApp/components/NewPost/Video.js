import React, { useState, useEffect, useRef } from 'react';

import PostControls from './PostControls';

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
    // eslint-disable-next-line
  }, [cameraIndex]); // TODO: Reference github issue

  // Changes the cameraIndex
  const changeCamera = () => {
    setCameraIndex((cameraIndex + 1) % cameras.length);
  };

  // Prevents rendering while the cameras are detected
  if (!cameras) return null;

  // Mirrors the front facing camera, Chrome and Firefox mobile deal with the order of devices differently
  const multipleCameras = cameras.length > 1;
  const frontCamera = !multipleCameras ? 0 : window.chrome ? 0 : 1;
  const style = {
    transform: cameraIndex === frontCamera ? 'rotateY(-180deg)' : ''
  };

  return (
    <>
      <video ref={videoRef} autoPlay style={style} />
      <PostControls>
        {
          /*multipleCameras &&*/ <button
            type="button"
            onClick={changeCamera}
            className="camera"
          >
            <span className="icon">
              <i className="fas fa-sync" />
            </span>
          </button>
        }
      </PostControls>
    </>
  );
};

export default Video;
