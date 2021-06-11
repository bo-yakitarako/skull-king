import { useCallback, useEffect } from 'react';

const WEBSOCKET_ORIGIN = 'ws://skull-king.bo-yakitarako.com/socket/';
const socket = new WebSocket(WEBSOCKET_ORIGIN);

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
