import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { socket } from './socket';
import { useOfferSending } from './useOfferSending.tsx';
import { useSendingAnswer } from './useSendingAnswer.tsx';
 
export function useChatConnection(peerConnection: RTCPeerConnection) {
  const { roomName } = useParams();
 
  const { sendOffer } = useOfferSending(peerConnection);
 
  const { handleConnectionOffer } = useSendingAnswer(peerConnection);
 
  const handleConnection = useCallback(() => {
    socket.emit('join_room', roomName);
  }, [roomName]);
 
  useEffect(() => {
    socket.connect();
    socket.on('connect', handleConnection);
    socket.on('another_person_ready', sendOffer);
    socket.on('send_connection_offer', handleConnectionOffer);
    return () => {
      socket.off('connect', handleConnection);
      socket.off('another_person_ready', sendOffer);
      socket.off('send_connection_offer', handleConnectionOffer);
    };
  }, [roomName, handleConnection, handleConnectionOffer, sendOffer]);
}