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

const ResetDialog: React.FC = () => {
  const [, openResetAll] = useDialog('resetAll');
  const [open, , closeDialog] = useDialog('reset');

  const { sendMessage } = useWebSocket();

  const resetScores = useCallback(() => {
    sendMessage({ type: 'RESET_SCORES' });
    closeDialog();
  }, [sendMessage]);

  const resetAll = useCallback(() => {
    closeDialog();
    openResetAll();
  }, [sendMessage]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>リセットしちゃおう</DialogTitle>
      <DialogContent>
        <DialogContentText>
          名前の登録は保持して得点情報だけ消す？もうちょいスカルキングやりたくね？
        </DialogContentText>
        <DialogContentText>
          それとも、名前の登録も得点も全部消しちゃう？やっぱもう終わりかぁ
        </DialogContentText>
        <ButtonLayout>
          <ResetButton color="primary" variant="outlined" onClick={resetScores}>
            得点だけリセット
          </ResetButton>
          <ResetButton color="secondary" variant="outlined" onClick={resetAll}>
            名前も得点も全部消す
          </ResetButton>
        </ButtonLayout>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ResetDialog };

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 110px;
  justify-content: space-between;
  margin-top: 20px;
`;

const ResetButton = styled(Button)`
  font-size: 16px;
  padding: 8px;
`;
