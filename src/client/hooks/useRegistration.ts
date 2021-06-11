import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { app } from '../modules/app';
import { register as registerRaw } from '../actions/app';
import { useSelector } from './useSelector';

const { setUser } = app.actions;

const useRegistation = () => {
  const dispatch = useDispatch();

  const { id } = useSelector(({ user }) => user);
  const registered = useMemo(() => id > 0, [id]);

  const register = useCallback((userName: string) => {
    dispatch(registerRaw(userName));
  }, []);

  const unregister = useCallback(() => {
    dispatch(setUser({ id: 0, name: '' }));
  }, []);

  return [registered, register, unregister] as [
    boolean,
    (userName: string) => void,
    () => void,
  ];
};

export { useRegistation };
