import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { app, DialogType } from '../modules/app';
import { useSelector } from './useSelector';

const { openDialog, closeDialog } = app.actions;

const useDialog = (dialogType: DialogType) => {
  const dispatch = useDispatch();
  const open = useSelector(({ dialog }) => dialog[dialogType]);

  const handleOpen = useCallback(() => {
    dispatch(openDialog(dialogType));
  }, []);

  const handleClose = useCallback(() => {
    dispatch(closeDialog(dialogType));
  }, []);

  return [open, handleOpen, handleClose] as [boolean, () => void, () => void];
};

export { useDialog };
