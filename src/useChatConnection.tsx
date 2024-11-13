
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { socket } from './socket';
 
export function useChatConnection() {
  const { roomName } = useParams();
 
  const handleConnection = useCallback(() => {
    socket.emit('join_room', roomName);
  }, [roomName]);
 
  useEffect(() => {
    socket.connect();
    socket.on('connect', handleConnection);
 
    return () => {
      socket.off('connect', handleConnection);
    };
  }, [roomName, handleConnection, roomName]);
}