import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Menu, Settings } from '@material-ui/icons';
import { media } from '../style/media';
import { SPMenu } from './SPMenu';
import { useDialog } from '../hooks/useDialog';

const HeadBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, openSetting] = useDialog('setting');
  const [, openAdd] = useDialog('addOrEdit');

  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <LayoutSP>
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
            <Menu />
          </IconButton>
          <SPMenu open={drawerOpen} onClose={handleDrawerClose} />
        </LayoutSP>
        <Title variant="h6">Skull Kingは神ゲー</Title>
        <LayoutSP>
          <UserInfo>+100点</UserInfo>
        </LayoutSP>
        <LayoutPC>
          <UserInfo>
            <UserIcon />
            しんにじえも
          </UserInfo>
          <UserInfo>+100点</UserInfo>
          <ActionButton color="inherit" variant="outlined" onClick={openAdd}>
            追加
          </ActionButton>
          <ActionButton color="inherit" variant="outlined">
            リセット
          </ActionButton>
          <IconButton color="inherit" onClick={openSetting}>
            <Settings />
          </IconButton>
        </LayoutPC>
      </Toolbar>
    </AppBar>
  );
};

export { HeadBar };

const Title = styled(Typography)`
  flex-grow: 1;
`;

const LayoutPC = styled.div`
  display: flex;
  align-items: center;
  ${media.lessThan('medium')`
    display: none;
  `}
`;

const ActionButton = styled(Button)`
  width: 100px;
  height: 40px;
  margin: 0 10px;
`;

const UserIcon = styled(AccountCircle)`
  transform: translateY(-1px);
  margin-right: 3px;
`;

const UserInfo = styled(Typography)`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const LayoutSP = styled.div`
  ${media.greaterThan('medium')`
    display: none;
  `}
`;
