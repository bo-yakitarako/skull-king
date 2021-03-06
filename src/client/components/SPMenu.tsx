import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  AddCircleOutline,
  Refresh,
  Settings,
} from '@material-ui/icons';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useDialog } from '../hooks/useDialog';
import { useRegistation } from '../hooks/useRegistration';
import { useCanAddScore } from '../hooks/useCanAddScore';
import { useShallowEqualSelector } from '../hooks/useShallowEqualSelector';

type Props = {
  open: boolean;
  onClose: () => void;
};

const SPMenu: React.FC<Props> = ({ open, onClose }) => {
  const { name, isExistsUser } = useShallowEqualSelector(({ user, data }) => ({
    name: user.name,
    isExistsUser: data.length > 0,
  }));

  const [, openSetting] = useDialog('setting');
  const [, openAdd] = useDialog('scoreSend');
  const [, openRegistration] = useDialog('registration');
  const [, openReset] = useDialog('reset');

  const [registered] = useRegistation();
  const canAddScore = useCanAddScore();

  const items = useMemo(
    () => [
      {
        icon: <AddCircleOutline />,
        text: '追加',
        onClick: () => {
          openAdd();
          onClose();
        },
        view: registered && canAddScore,
      },
      {
        icon: <Refresh />,
        text: 'リセット',
        onClick: () => {
          openReset();
          onClose();
        },
        view: isExistsUser,
      },
      {
        icon: <Settings />,
        text: '設定',
        onClick: () => {
          openSetting();
          onClose();
        },
        view: true,
      },
    ],
    [registered, isExistsUser, canAddScore],
  );

  return (
    <StyledDrawer open={open} onClose={onClose}>
      <DrawerWrapper>
        <DrawerHeader>
          {registered ? (
            <>
              <UserIcon />
              <UserName>{name}</UserName>
            </>
          ) : (
            <RegisterButton
              variant="outlined"
              color="inherit"
              onClick={() => {
                openRegistration();
                onClose();
              }}
            >
              登録
            </RegisterButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {items.map(
            ({ icon, text, onClick, view }) =>
              view && (
                <ListItem onClick={onClick} button key={text}>
                  <IconWrapper>{icon}</IconWrapper>
                  <ListItemText primary={text} />
                </ListItem>
              ),
          )}
        </List>
      </DrawerWrapper>
    </StyledDrawer>
  );
};

export { SPMenu };

const StyledDrawer = styled(Drawer)`
  flex-shrink: 0;
`;

const DrawerWrapper = styled.div`
  width: 240px;
  background-color: ${({ theme }) => theme.palette.primary.light};
  min-height: 100vh;
`;

const DrawerHeader = styled.div`
  display: flex;
  padding: 15px;
`;

const UserIcon = styled(AccountCircle)`
  transform: translateY(-1px);
`;

const UserName = styled(Typography)`
  margin-left: 5px;
`;

const RegisterButton = styled(Button)`
  width: 120px;
  font-size: 16px;
  padding: 8px;
`;

const IconWrapper = styled(ListItemIcon)`
  > svg {
    fill: ${({ theme }) => theme.palette.text.primary} !important;
  }
`;
