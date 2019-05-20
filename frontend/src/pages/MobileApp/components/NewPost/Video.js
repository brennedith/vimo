import React, { useState, useEffect, useRef } from 'react';

import PostControls from './PostControls';

import './Video.css';

const Video = ({ type, handleSend }) => {
  const isVideo = type === 'video';
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

  // Sends the content based on the type of media
  const sendContent = () => {
    const video = videoRef.current;

    if (isVideo) {
      const opts = { mimeType: 'video/webm' };
      const rec = new MediaRecorder(video.srcObject, opts);
      const blobs = [];

      rec.ondataavailable = e =>
        e.data && e.data.size > 0 ? blobs.push(e.data) : null;

      rec.onstop = () => {
        const blob = new Blob(blobs, { type: 'video/mp4' });
        const file = new File([blob], 'video.mp4');

        handleSend({
          media: file
        });
      };

      rec.start();
      setTimeout(() => rec.stop(), 10000);
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      canvas.toBlob(blob => {
        const file = new File([blob], 'photo.jpeg');

        handleSend({
          media: file
        });
      }, 'image/jpeg');
    }
  };

  // Prevents rendering while the cameras are detected
  if (!cameras) return null;

  // Mirrors the front facing camera, Chrome and Firefox mobile deal with the order of devices differently
  const multipleCameras = cameras.length > 1;
  const frontCamera = !multipleCameras ? true : window.chrome ? true : false;
  const frontCameraIndex = frontCamera ? 0 : 1;
  const style = {
    transform: cameraIndex === frontCameraIndex ? 'rotateY(-180deg)' : ''
  };

  return (
    <>
      <video ref={videoRef} autoPlay style={style} />
      <PostControls
        handleSend={sendContent}
        leftPanel={
          isVideo && (
            <button type="button" className="round-block">
              10
            </button>
          )
        }
        rightPanel={
          multipleCameras && (
            <button type="button" onClick={changeCamera} className="camera">
              <span className="icon">
                <i className="fas fa-sync" />
              </span>
            </button>
          )
        }
      />
    </>
  );
};

export default Video;
