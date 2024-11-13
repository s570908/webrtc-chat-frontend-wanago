import { useMemo, useState } from 'react';
import { socket } from './socket.tsx';
import { useParams } from 'react-router-dom';
 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function usePeerConnection(localStream: MediaStream) {
  const { roomName } = useParams();
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);
 
  const peerConnection = useMemo(() => {
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun2.1.google.com:19302' }],
    });
 
    connection.addEventListener('icecandidate', ({ candidate }) => {
      socket.emit('send_candidate', { candidate, roomName });
    });
 
    connection.addEventListener('track', ({ streams }) => {
      setGuestStream(streams[0]);
    });
 
    localStream.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });
 
    return connection;
  }, [localStream, roomName]);
 
  return {
    peerConnection,
    guestStream,
  };
}