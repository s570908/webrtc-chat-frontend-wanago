
import { useLocalCameraStream } from './useLocalCameraStream';
import { VideoFeed } from './VideoFeed';
 
export function App() {
  const { localStream } = useLocalCameraStream();
 
  if (!localStream) {
    return null;
  }
 
  return <VideoFeed mediaStream={localStream} isMuted={true} />;
}
