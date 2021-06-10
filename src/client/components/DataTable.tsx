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
import { useSelector } from '../hooks/useSelector';
import { media } from '../style/media';

const DataTable: React.FC = () => {
  const { fontSize, cellWidth } = useSelector(({ setting }) => setting);

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
            <Th>
              <p>あああ</p>
              <span>+100</span>
            </Th>
            <Th>
              <p>ぶりぶり</p>
              <span>-40</span>
            </Th>
            <Th loginuser="true">
              <p>しんにじえも</p>
              <span>+20</span>
            </Th>
            <Th>
              <p>ざえもん</p>
              <span>+210</span>
            </Th>
          </TableRow>
        </TableHead>
        <TableBody>
          <BodyRow>
            <Td head>1</Td>
            <Td>+10</Td>
            <Td>-10</Td>
            <Td>-10</Td>
            <Td>-10</Td>
          </BodyRow>
          <BodyRow>
            <Td head>2</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>3</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>4</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>5</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>6</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>7</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>8</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>9</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
          <BodyRow>
            <Td head>10</Td>
            <Td>+40</Td>
            <Td>-20</Td>
            <Td>+20</Td>
            <Td>+20</Td>
          </BodyRow>
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
`;

const DummyTh = styled(TableCell)<{ fontSize: number }>`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  width: ${({ fontSize }) => fontSize * 2}px;
`;

type Th = {
  loginuser?: 'true' | 'false';
};

const StyledTh = styled(TableCell)<Th & Setting>`
  width: ${({ cellwidth }) => cellwidth}px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme: { palette }, loginuser }) => {
    console.log(loginuser);
    return loginuser ? palette.secondary.light : palette.primary.contrastText;
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
