import React, { useCallback, useMemo, useState } from 'react';
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
import { useRegistation } from '../hooks/useRegistration';
import { useOwnData } from '../hooks/useOwnData';
import { useShallowEqualSelector } from '../hooks/useShallowEqualSelector';
import { useScoreEdit } from '../hooks/useScoreEdit';

const HeadBar: React.FC = () => {
  const { name, isExistsUser } = useShallowEqualSelector(({ user, data }) => ({
    name: user.name,
    isExistsUser: data.length > 0,
  }));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, openSetting] = useDialog('setting');
  const [, openAdd] = useDialog('scoreSend');
  const [, openRegistration] = useDialog('registration');
  const [, openReset] = useDialog('reset');

  const [registered] = useRegistation();
  const { ownScores } = useOwnData();
  const { canAddScore } = useScoreEdit();

  const score = useMemo(() => {
    if (typeof ownScores === 'undefined') {
      return '0点';
    }
    const sumScore = ownScores.reduce(
      (pre, cur) => (pre as number) + (cur || 0),
      0,
    ) as number;
    const sign = sumScore > 0 ? '+' : '';
    return `${sign}${sumScore}点`;
  }, [ownScores]);

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
          {registered ? (
            <UserInfo>{score}</UserInfo>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              onClick={openRegistration}
            >
              登録
            </Button>
          )}
        </LayoutSP>
        <LayoutPC>
          {registered ? (
            <>
              <UserInfo>
                <UserIcon />
                {name}
              </UserInfo>
              <UserInfo>{score}</UserInfo>
              {canAddScore && (
                <ActionButton
                  color="inherit"
                  variant="outlined"
                  onClick={openAdd}
                >
                  追加
                </ActionButton>
              )}
            </>
          ) : (
            <ActionButton
              color="inherit"
              variant="outlined"
              onClick={openRegistration}
            >
              登録
            </ActionButton>
          )}
          {isExistsUser && (
            <ActionButton
              color="inherit"
              variant="outlined"
              onClick={openReset}
            >
              リセット
            </ActionButton>
          )}
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
