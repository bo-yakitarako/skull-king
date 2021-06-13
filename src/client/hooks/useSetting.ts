import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { app, Setting } from '../modules/app';
import { useSelector } from './useSelector';

const { setSetting } = app.actions;

const useSetting = (target: keyof Setting, amount = 1) => {
  const dispatch = useDispatch();

  const currentValue = useSelector(({ setting }) => setting[target]);

  const [formValue, setFormValue] = useState(`${currentValue}`);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const valueText = event.target.value;
      setFormValue(valueText);
      if (!/^[0-9]+$/.test(valueText)) {
        return;
      }
      let value = parseInt(valueText, 10);
      if (value < 1) {
        setFormValue('1');
        value = 1;
      }
      dispatch(setSetting({ target, value }));
    },
    [],
  );

  const increment = useCallback(() => {
    const formNumber = parseInt(formValue, 10);
    if (Number.isNaN(formNumber)) {
      setFormValue(`${currentValue}`);
      return;
    }
    const value = formNumber + amount;
    dispatch(setSetting({ target, value }));
    setFormValue(`${value}`);
  }, [formValue, currentValue]);

  const decrement = useCallback(() => {
    const formNumber = parseInt(formValue, 10);
    if (Number.isNaN(formNumber)) {
      setFormValue(`${currentValue}`);
      return;
    }
    if (currentValue <= 1) {
      return;
    }
    const value = formNumber - amount;
    dispatch(setSetting({ target, value }));
    setFormValue(`${value}`);
  }, [formValue, currentValue]);

  return [formValue, onChange, increment, decrement] as [
    string,
    () => void,
    () => void,
    () => void,
  ];
};

export { useSetting };
