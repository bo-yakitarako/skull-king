import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { WebSocketType } from '../../webSocketType';
import { app } from '../modules/app';

const socket = new ReconnectingWebSocket(WEBSOCKET_ORIGIN, undefined, {
  maxReconnectionDelay: 4000,
  minReconnectionDelay: 1000,
  connectionTimeout: 1500,
});

const useWebSocket = () => {
  const dispatch = useDispatch();

  const sendMessage = useCallback(
    (request: WebSocketType) => {
      socket.send(JSON.stringify(request));
    },
    [socket],
  );

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocketサーバーと接続成功！');
      sendMessage({ type: 'INITIALIZE' });
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      dispatch(app.actions.setData(JSON.parse(event.data)));
    };
    socket.onclose = () => {
      console.log('閉じます');
    };
  }, [socket]);

  return { sendMessage };
};

export { useWebSocket };
