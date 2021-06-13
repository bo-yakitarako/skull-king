import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useDialog } from '../../hooks/useDialog';
import { useRegistation } from '../../hooks/useRegistration';
import { useSelector } from '../../hooks/useSelector';

const RegistrationDialog: React.FC = () => {
  const { name } = useSelector(({ user }) => user);

  const [open, , handleClose] = useDialog('registration');
  const [, postName] = useRegistation();

  const [formName, setFormName] = useState(name);

  const handlePost = useCallback(() => {
    if (formName !== '') {
      postName(formName);
      handleClose();
    }
  }, [formName]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>登録する</DialogTitle>
      <DialogContent>
        <DialogContentText>
          名前を入力して送信して名前を登録してみよう
        </DialogContentText>
        <TextField
          fullWidth
          color="primary"
          autoFocus
          label="名前を入力"
          onChange={(event) => setFormName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handlePost}>
          送信
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { RegistrationDialog };
