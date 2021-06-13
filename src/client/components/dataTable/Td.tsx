import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { TableCell } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useDialog } from '../../hooks/useDialog';
import { app } from '../../modules/app';
import { useSelector } from '../../hooks/useSelector';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

type Props = {
  userIndex?: number;
  battleIndex?: number;
};

const Td: React.FC<Props> = ({ userIndex, battleIndex, children }) => {
  const fontSize = useSelector(({ setting }) => setting.fontSize);
  if (typeof userIndex === 'undefined' || typeof battleIndex === 'undefined') {
    return (
      <StyledTd align="right" fontSize={fontSize} openedit="false">
        {children}
      </StyledTd>
    );
  }

  const dispatch = useDispatch();

  const { isMyIndex, nextAdditionIndex } = useShallowEqualSelector(
    ({ user, data }) => {
      const nextAdditionIndex = data[userIndex].scores.findIndex(
        (value) => value === null,
      );
      const isMyIndex = data[userIndex].userId === user.id;
      return {
        isMyIndex,
        nextAdditionIndex,
      };
    },
  );

  const [, openScoreDialog] = useDialog('scoreSend');

  const canOpenEdit = useMemo(
    () => isMyIndex && battleIndex <= nextAdditionIndex,
    [isMyIndex, nextAdditionIndex],
  );

  const handleClick = useCallback(() => {
    if (!canOpenEdit) {
      return;
    }
    if (battleIndex < nextAdditionIndex) {
      dispatch(app.actions.setEditIndex(battleIndex));
    }
    openScoreDialog();
  }, [canOpenEdit, nextAdditionIndex]);

  return (
    <StyledTd
      fontSize={fontSize}
      openedit={canOpenEdit ? 'true' : 'false'}
      onClick={handleClick}
    >
      {children}
    </StyledTd>
  );
};

export { Td };

type ColumnStyle = {
  fontSize: number;
  openedit: 'true' | 'false';
};

const StyledTd = styled(TableCell)<ColumnStyle>`
  font-size: ${({ fontSize }) => fontSize}px;
  &:hover {
    cursor: ${({ openedit }) => (openedit === 'true' ? 'pointer' : 'defalut')};
  }
`;
