import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useDataTable } from '../../hooks/useDataTable';
import { useSelector } from '../../hooks/useSelector';
import { media } from '../../style/media';
import { Th } from './Th';
import { Td } from './Td';

const DataTable: React.FC = () => {
  const fontSize = useSelector(({ setting }) => setting.fontSize);

  const { headerUsers, scoreDatas } = useDataTable();

  return (
    <Wrapper>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            <DummyTh fontSize={fontSize} />
            {headerUsers.map(({ userId, userName, scoreText }) => (
              <Th key={userId} userId={userId}>
                <p>{userName}</p>
                <span>{scoreText}</span>
              </Th>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreDatas.map((datas, battleIndex) => (
            <BodyRow key={`${battleIndex}`}>
              <Td>{battleIndex + 1}</Td>
              {datas.map((score, userIndex) => (
                <Td
                  key={`${score}${userIndex}`}
                  userIndex={userIndex}
                  battleIndex={battleIndex}
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

const BodyRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;
