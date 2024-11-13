
import { useMemo } from 'react';
 
export function usePeerConnection(localStream: MediaStream) {
  const peerConnection = useMemo(() => {
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun2.1.google.com:19302' }],
    });
 
    localStream.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });
 
    return connection;
  }, []);
 
  return {
    peerConnection,
  };
}