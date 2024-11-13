
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VideoChatRoom } from './VideoChatRoom';
import React from 'react';
import { useLocalCameraStream } from './useLocalCameraStream';
 
export const App = () => {
  const { localStream } = useLocalCameraStream();
 
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="video-chat-room/:roomName"
          element={localStream && <VideoChatRoom localStream={localStream} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
