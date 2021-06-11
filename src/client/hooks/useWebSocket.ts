import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { app } from '../modules/app';

const socket = new ReconnectingWebSocket(WEBSOCKET_ORIGIN, undefined, {
  maxReconnectionDelay: 4000,
  minReconnectionDelay: 1000,
  connectionTimeout: 1500,
});

const useWebSocket = () => {
  const dispatch = useDispatch();

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
      dispatch(app.actions.setComment(event.data));
      alert(event.data); // eslint-disable-line no-alert
    };
    socket.onclose = () => {
      console.log('閉じます');
    };
  }, [socket]);

  return { sendMessage };
};

export { useWebSocket };
