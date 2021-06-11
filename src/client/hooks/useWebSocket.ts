import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { app } from '../modules/app';
import { useSelector } from './useSelector';

const useWebSocket = () => {
  const dispatch = useDispatch();
  const socket = useSelector(({ socket }) => socket);

  const sendMessage = useCallback((message: string) => {
    socket.send(message);
  }, []);

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
