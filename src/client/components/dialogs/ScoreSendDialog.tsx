import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
} from '@material-ui/core';
import { Add, AddCircle, Remove, RemoveCircle } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useDialog } from '../../hooks/useDialog';
import { useEditScore } from '../../hooks/useEditScore';
import { useOwnData } from '../../hooks/useOwnData';
import { app } from '../../modules/app';

const ScoreSendDialog: React.FC = () => {
  const dispatch = useDispatch();

  const [open, , closeDialog] = useDialog('scoreSend');

  const { battleIndex } = useOwnData();
  const { scoreText, edit, post } = useEditScore();

  const handleClose = useCallback(() => {
    closeDialog();
    setTimeout(() => {
      dispatch(app.actions.setEditIndex(-1));
    }, 200);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>第{battleIndex + 1}戦のスコア</DialogTitle>
      <DialogContent>
        <DialogContentText>
          第{battleIndex + 1}
          戦の点数をボタンポチポチで決めてくなんせ。
        </DialogContentText>
        <DialogContentText>
          黒縁丸囲みのプラマイは50くらい変わるっぽいよ。
        </DialogContentText>
        <LayoutInput>
          <EditButton onClick={edit(-50)}>
            <RemoveCircle />
          </EditButton>
          <EditButton onClick={edit(-10)}>
            <Remove />
          </EditButton>
          <ScoreDisplay>{scoreText}</ScoreDisplay>
          <EditButton onClick={edit(10)}>
            <Add />
          </EditButton>
          <EditButton onClick={edit(50)}>
            <AddCircle />
          </EditButton>
        </LayoutInput>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            post();
            handleClose();
          }}
        >
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
  align-items: center;
`;

const ScoreDisplay = styled(Paper)`
  font-size: 18px;
  padding: 8px 0;
  margin: 0 8px;
  width: 80px;
  min-width: 80px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
`;

const EditButton = styled(IconButton)`
  padding: 8px;
`;
