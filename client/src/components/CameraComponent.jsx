import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = ({ onUserMedia }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const video = webcamRef.current.video;
    video.addEventListener('loadeddata', () => {
      onUserMedia({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    });
  }, [onUserMedia]);

  return <Webcam audio={false} ref={webcamRef} className="camera-video" />;
};

export default CameraComponent;
