import React from 'react';
import { TableCell } from '@material-ui/core';
import styled from 'styled-components';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

type Props = {
  userId: number;
};

const Th: React.FC<Props> = ({ userId, children }) => {
  const { fontSize, cellWidth, isLoginUser } = useShallowEqualSelector(
    ({ setting, user }) => ({
      ...setting,
      isLoginUser: (userId === user.id ? 'true' : 'false') as 'true' | 'false',
    }),
  );

  return (
    <StyledTh loginuser={isLoginUser} fontSize={fontSize} cellwidth={cellWidth}>
      {children}
    </StyledTh>
  );
};

export { Th };

type StyleProps = {
  fontSize: number;
  cellwidth: number;
  loginuser: 'true' | 'false';
};

const StyledTh = styled(TableCell)<StyleProps>`
  width: ${({ cellwidth }) => cellwidth}px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme: { palette }, loginuser }) => {
    return loginuser === 'true'
      ? palette.secondary.light
      : palette.primary.contrastText;
  }};
  padding: ${({ fontSize }) => (fontSize < 20 ? 10 : 15)}px;
  border: none;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 700;
  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: ${({ fontSize }) => fontSize + 4}px;
    margin: 0;
  }
  > span {
    line-height: ${({ fontSize }) => fontSize + 4}px;
  }
`;
