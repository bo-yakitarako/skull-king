import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { app } from '../modules/app';

const socket = new WebSocket(WEBSOCKET_ORIGIN);

const useWebSocket = () => {
  const dispatch = useDispatch();

  const sendMessage = useCallback((message: string) => {
    socket.send(message);
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocketサーバーと接続成功！');
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      dispatch(app.actions.setComment(event.data));
    };
    socket.onclose = () => {
      console.log('閉じます');
      document.location.reload();
    };
  }, [socket]);

  return { sendMessage };
};

export { useWebSocket };
