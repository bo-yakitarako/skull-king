import {
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

type Props = {
  open: boolean;
  onClose: () => void;
};

const SPMenu: React.FC<Props> = ({ open, onClose }) => {
  const [, openSetting] = useDialog('setting');

  const items = useMemo(
    () => [
      {
        icon: <AddCircleOutline />,
        text: '追加',
        onClick: () => {
          console.log('あほげえじ');
        },
      },
      {
        icon: <Refresh />,
        text: 'リセット',
        onClick: () => {
          console.log('ちんちん');
        },
      },
      {
        icon: <Settings />,
        text: '設定',
        onClick: () => {
          openSetting();
          onClose();
        },
      },
    ],
    [],
  );

  return (
    <StyledDrawer open={open} onClose={onClose}>
      <DrawerWrapper>
        <DrawerHeader>
          <UserIcon />
          <UserName>しんにじえも</UserName>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map(({ icon, text, onClick }) => (
            <ListItem onClick={onClick} button key={text}>
              <IconWrapper>{icon}</IconWrapper>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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

const IconWrapper = styled(ListItemIcon)`
  > svg {
    fill: ${({ theme }) => theme.palette.text.primary} !important;
  }
`;
