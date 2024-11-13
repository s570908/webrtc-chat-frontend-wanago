
import { VideoFeed } from './VideoFeed';
import { FunctionComponent } from 'react';
import { useChatConnection } from './useChatConnection';
 
interface Props {
  localStream: MediaStream;
}
 
export const VideoChatRoom: FunctionComponent<Props> = ({ localStream }) => {
  useChatConnection();
 
  return <VideoFeed mediaStream={localStream} isMuted={true} />;
};