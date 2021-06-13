import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useDialog } from '../../hooks/useDialog';
import { useWebSocket } from '../../hooks/useWebSocket';

const ResetAllDialog: React.FC = () => {
  const [open, , closeDialog] = useDialog('resetAll');

  const { sendMessage } = useWebSocket();

  const resetAll = useCallback(() => {
    sendMessage({ type: 'RESET_ALL' });
    closeDialog();
  }, [sendMessage]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>本当に全部消しちゃうよ？</DialogTitle>
      <DialogContent>
        <DialogContentText>いいね？</DialogContentText>
        <ButtonLayout>
          <ResetButton color="primary" variant="outlined" onClick={resetAll}>
            私の意志は堅い
          </ResetButton>
        </ButtonLayout>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          やっぱやめます
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ResetAllDialog };

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ResetButton = styled(Button)`
  font-size: 16px;
  padding: 8px;
`;
