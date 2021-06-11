import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDialog } from '../../hooks/useDialog';
import { useWebSocket } from '../../hooks/useWebSocket';

const ScoreSendDialog: React.FC = () => {
  const [open, , handleClose] = useDialog('scoreSend');
  const { sendMessage } = useWebSocket();

  const [message, setFormMessage] = useState('');

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>点を加えちゃおうね</DialogTitle>
      <DialogContent>
        <DialogContentText>
          点数をお願いします。数字しか受け付けないよそんな嘘だよ
        </DialogContentText>
        <LayoutInput>
          <TextField
            value={message}
            onChange={(event) => setFormMessage(event.target.value)}
            variant="standard"
          />
        </LayoutInput>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => message && sendMessage(message)} color="primary">
          送信
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ScoreSendDialog };

const LayoutInput = styled.div`
  display: flex;
  justify-content: center;
`;
