import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useDataTable } from '../hooks/useDataTable';
import { useDialog } from '../hooks/useDialog';
import { useShallowEqualSelector } from '../hooks/useShallowEqualSelector';
import { app } from '../modules/app';
import { media } from '../style/media';

type NumberColumn = {
  head?: boolean;
  userIndex?: number;
  battleIndex?: number;
};

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const [, openScoreDialog] = useDialog('scoreSend');

  const { fontSize, cellWidth, ownUserId } = useShallowEqualSelector(
    ({ setting, user }) => ({
      ...setting,
      ownUserId: user.id,
    }),
  );

  const { headerUsers, scoreDatas } = useDataTable();

  const ownDataIndex = useMemo(() => {
    return headerUsers.findIndex(({ userId }) => userId === ownUserId);
  }, [headerUsers, ownUserId]);

  const Th: React.FC<Th> = useCallback(
    ({ children, loginuser }) => (
      <StyledTh loginuser={loginuser} fontSize={fontSize} cellwidth={cellWidth}>
        {children}
      </StyledTh>
    ),
    [fontSize, cellWidth],
  );

  const Td: React.FC<NumberColumn> = useCallback(
    ({ children, head, userIndex, battleIndex }) => {
      const inputed =
        ownDataIndex > 0 &&
        typeof battleIndex !== 'undefined' &&
        scoreDatas[battleIndex][ownDataIndex] !== '-';

      const own = userIndex === ownDataIndex && inputed;

      const handleClick = () => {
        if (!own || typeof battleIndex === 'undefined') {
          return;
        }
        dispatch(app.actions.setEditIndex(battleIndex));
        openScoreDialog();
      };

      return (
        <StyledTd
          align={head ? 'right' : 'left'}
          fontSize={fontSize}
          own={own ? 'true' : 'false'}
          onClick={handleClick}
        >
          {children}
        </StyledTd>
      );
    },
    [fontSize, ownUserId, headerUsers],
  );

  return (
    <Wrapper>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            <DummyTh fontSize={fontSize} />
            {headerUsers.map(({ userId, userName, scoreText }) => (
              <Th
                key={userId}
                loginuser={ownUserId === userId ? 'true' : 'false'}
              >
                <p>{userName}</p>
                <span>{scoreText}</span>
              </Th>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreDatas.map((datas, index) => (
            <BodyRow key={`${index}`}>
              <Td head>{index + 1}</Td>
              {datas.map((score, userIndex) => (
                <Td
                  key={`${score}${userIndex}`}
                  userIndex={userIndex}
                  battleIndex={index}
                >
                  {score}
                </Td>
              ))}
            </BodyRow>
          ))}
        </TableBody>
      </StyledTable>
    </Wrapper>
  );
};

export { DataTable };

type Setting = {
  fontSize: number;
  cellwidth: number;
};

const Wrapper = styled(TableContainer)`
  flex-grow: 1;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${media.greaterThan('medium')`
    max-height: calc(100vh - 100px);
  `}
`;

const StyledTable = styled(Table)`
  table-layout: fixed;
  width: fit-content;
  ${media.lessThan('medium')`
    margin: 0 auto;
  `}
`;

const DummyTh = styled(TableCell)<{ fontSize: number }>`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  width: ${({ fontSize }) => fontSize * 1.2}px;
`;

type Th = {
  loginuser?: 'true' | 'false';
};

const StyledTh = styled(TableCell)<Th & Setting>`
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
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: ${({ fontSize }) => fontSize + 4}px;
    margin: 0;
  }
  > span {
    line-height: ${({ fontSize }) => fontSize + 4}px;
  }
`;

const BodyRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;

const StyledTd = styled(TableCell)<{ fontSize: number; own: 'true' | 'false' }>`
  font-size: ${({ fontSize }) => fontSize}px;
  &:hover {
    cursor: ${({ own }) => (own === 'true' ? 'pointer' : 'defalut')};
  }
`;
