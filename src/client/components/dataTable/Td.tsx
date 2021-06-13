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

  const { isMyIndex, indexToAdd } = useShallowEqualSelector(
    ({ user, data }) => {
      const nextBattleIndex = data[userIndex].scores.findIndex(
        (value) => value === null,
      );
      const indexToAdd =
        nextBattleIndex < 0 ? data[userIndex].scores.length : nextBattleIndex;
      const isMyIndex = data[userIndex].userId === user.id;
      return {
        isMyIndex,
        indexToAdd,
      };
    },
  );

  const [, openScoreDialog] = useDialog('scoreSend');

  const canOpenEdit = useMemo(
    () => isMyIndex && battleIndex <= indexToAdd,
    [isMyIndex, indexToAdd],
  );

  const handleClick = useCallback(() => {
    if (!canOpenEdit) {
      return;
    }
    if (battleIndex < indexToAdd) {
      dispatch(app.actions.setEditIndex(battleIndex));
    }
    openScoreDialog();
  }, [canOpenEdit, indexToAdd]);

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
