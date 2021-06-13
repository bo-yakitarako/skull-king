import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterName } from '../../webSocketType';
import { app } from '../modules/app';
import { useSelector } from './useSelector';
import { useWebSocket } from './useWebSocket';

const useRegistation = () => {
  const dispatch = useDispatch();

  const { sendMessage } = useWebSocket();

  const { id } = useSelector(({ user }) => user);
  const registered = useMemo(() => id > 0, [id]);

  const register = useCallback(
    (userName: string) => {
      dispatch(app.actions.setUserName(userName));
      const request = {
        type: 'REGISTER_NAME',
        payload: { userName },
      } as RegisterName;
      sendMessage(request);
      localStorage.userName = userName;
    },
    [sendMessage],
  );

  const unregister = useCallback(() => {
    dispatch(app.actions.setUser({ id: 0, name: '' }));
  }, []);

  return [registered, register, unregister] as [
    boolean,
    (userName: string) => void,
    () => void,
  ];
};

export { useRegistation };
