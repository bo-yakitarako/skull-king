import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { Add, AddCircle, Remove, RemoveCircle } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useDialog } from '../../hooks/useDialog';
import { useEditScore } from '../../hooks/useEditScore';
import { useOwnData } from '../../hooks/useOwnData';
import { app } from '../../modules/app';
import { media } from '../../style/media';

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
        <NoSmallSP>
          <DialogContentText>
            黒縁丸囲みのプラマイは50くらい変わるっぽいよ。
          </DialogContentText>
        </NoSmallSP>
        <LayoutInput>
          <NoSmallSP>
            <EditButton onClick={edit(-50)}>
              <RemoveCircle fontSize="large" />
            </EditButton>
          </NoSmallSP>
          <EditButton onClick={edit(-10)}>
            <Remove fontSize="large" />
          </EditButton>
          <ScoreDisplay>
            <ScoreText>{scoreText}</ScoreText>
          </ScoreDisplay>
          <EditButton onClick={edit(10)}>
            <Add fontSize="large" />
          </EditButton>
          <NoSmallSP>
            <EditButton onClick={edit(50)}>
              <AddCircle fontSize="large" />
            </EditButton>
          </NoSmallSP>
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

const NoSmallSP = styled.div`
  ${media.lessThan('tiny')`
    display: none;
  `}
`;

const LayoutInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const ScoreDisplay = styled(Paper)`
  padding: 8px 0;
  margin: 0 8px;
  width: 80px;
  min-width: 80px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
`;

const ScoreText = styled(Typography)`
  font-size: 18px;
  padding: 0;
  margin: 0;
`;

const EditButton = styled(IconButton)`
  padding: 5px;
`;
