import { useCallback, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const socket = new ReconnectingWebSocket(WEBSOCKET_ORIGIN, undefined, {
  maxReconnectionDelay: 4000,
  minReconnectionDelay: 1000,
  connectionTimeout: 1500,
});

const useWebSocket = () => {
  const sendMessage = useCallback(
    (message: string) => {
      socket.send(message);
    },
    [socket],
  );

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocketサーバーと接続成功！');
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      alert(event.data); // eslint-disable-line no-alert
    };
    socket.onclose = () => {
      console.log('閉じます');
    };
  }, [socket]);

  return { sendMessage };
};

export { useWebSocket };
