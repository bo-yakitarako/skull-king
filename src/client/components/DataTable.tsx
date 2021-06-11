import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDataTable } from '../hooks/useDataTable';
import { useShallowEqualSelector } from '../hooks/useShallowEqualSelector';
import { media } from '../style/media';

const DataTable: React.FC = () => {
  const { fontSize, cellWidth, ownUserId } = useShallowEqualSelector(
    ({ setting, user }) => ({
      ...setting,
      ownUserId: user.id,
    }),
  );

  const { headerUsers, scoreDatas } = useDataTable();

  const Th: React.FC<Th> = useCallback(
    ({ children, loginuser }) => (
      <StyledTh loginuser={loginuser} fontSize={fontSize} cellwidth={cellWidth}>
        {children}
      </StyledTh>
    ),
    [fontSize, cellWidth],
  );

  const Td: React.FC<{ head?: boolean }> = useCallback(
    ({ children, head }) => (
      <StyledTd align={head ? 'right' : 'left'} fontSize={fontSize}>
        {children}
      </StyledTd>
    ),
    [fontSize, cellWidth],
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
              {datas.map((score, deepIndex) => (
                <Td key={`${score}${deepIndex}`}>{score}</Td>
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

const StyledTd = styled(TableCell)<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
`;
