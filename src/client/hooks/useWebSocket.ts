import { useCallback, useEffect } from 'react';

const socket = new WebSocket('ws://localhost:5001');

const useWebSocket = () => {
  const sendMessage = useCallback((message: string) => {
    socket.send(message);
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocketサーバーと接続成功！');
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      console.log(event.data);
    };
  }, []);

  return { sendMessage };
};

export { useWebSocket };
