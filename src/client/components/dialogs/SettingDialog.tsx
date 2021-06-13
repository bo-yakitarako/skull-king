import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { useDialog } from '../../hooks/useDialog';
import { useSetting } from '../../hooks/useSetting';
import { media } from '../../style/media';

const SettingDialog: React.FC = () => {
  const [open, , handleClose] = useDialog('setting');

  const [fontValue, onFontChange, fontIncrement, fontDecrement] =
    useSetting('fontSize');

  const [cellWidth, onCellWidthChange, cellIncrement, cellDecrement] =
    useSetting('cellWidth', 10);

  const [
    rankingWidth,
    onRankingWidthChange,
    rankingIncrement,
    rankingDecrement,
  ] = useSetting('rankingWidth', 10);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>設定</DialogTitle>
      <DialogContent>
        <DialogContentText>
          メイン画面のフォントの大きさとデータ表の列の大きさを調整できるよ
        </DialogContentText>
        <LayoutInput>
          <IconButton onClick={fontDecrement}>
            <RemoveCircleOutline />
          </IconButton>
          <TextField
            variant="outlined"
            label="フォントの大きさ"
            size="small"
            onChange={onFontChange}
            value={fontValue}
          />
          <IconButton onClick={fontIncrement}>
            <AddCircleOutline />
          </IconButton>
        </LayoutInput>
        <LayoutInput>
          <IconButton onClick={cellDecrement}>
            <RemoveCircleOutline />
          </IconButton>
          <TextField
            variant="outlined"
            label="列の大きさ"
            size="small"
            onChange={onCellWidthChange}
            value={cellWidth}
          />
          <IconButton onClick={cellIncrement}>
            <AddCircleOutline />
          </IconButton>
        </LayoutInput>
        <LayoutInputOnlyPC>
          <IconButton onClick={rankingDecrement}>
            <RemoveCircleOutline />
          </IconButton>
          <TextField
            variant="outlined"
            label="ランキングの幅"
            size="small"
            onChange={onRankingWidthChange}
            value={rankingWidth}
          />
          <IconButton onClick={rankingIncrement}>
            <AddCircleOutline />
          </IconButton>
        </LayoutInputOnlyPC>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { SettingDialog };

const LayoutInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const LayoutInputOnlyPC = styled(LayoutInput)`
  ${media.lessThan('medium')`
    display: none;
  `}
`;
