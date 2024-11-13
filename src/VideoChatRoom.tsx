import { VideoFeed } from './VideoFeed';
import { FunctionComponent } from 'react';
import { useChatConnection } from './useChatConnection';
import { usePeerConnection } from './usePeerConnection.tsx';
 
interface Props {
  localStream: MediaStream;
}
 
export const VideoChatRoom: FunctionComponent<Props> = ({ localStream }) => {
  const { peerConnection } = usePeerConnection(localStream);
  useChatConnection(peerConnection);
 
  return <VideoFeed mediaStream={localStream} isMuted={true} />;
};