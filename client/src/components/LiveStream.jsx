import React, { useState, useEffect } from 'react';
import { Player } from 'video-react';

const LiveStream = () => {
    const [streamUrl, setStreamUrl] = useState('');

    useEffect(() => {
      // Assuming your RTSP stream is accessible at this path
      const rtspUrl = 'rtsp://your_stream_address:port/path';
      const hlsUrl = `http://localhost:8080/live/${rtspUrl.split('/').pop()}`; // Generate HLS URL
  
      setStreamUrl(hlsUrl);
    }, []);
  
    return (
      <div>
        <Player playsInline src={streamUrl} />
      </div>
    );
}

export default LiveStream