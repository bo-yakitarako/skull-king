import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useSelector } from '../hooks/useSelector';
import { media } from '../style/media';

const Ranking: React.FC = () => {
  const { fontSize } = useSelector(({ setting }) => setting);

  return (
    <Wrapper>
      <Head>
        <HeadText fontSize={fontSize}>ランキング</HeadText>
      </Head>
      <Players fontSize={fontSize}>
        <Row>
          <Order fontSize={fontSize}>1</Order>
          <Name fontSize={fontSize}>ざえもん</Name>
          <Score fontSize={fontSize}>+210</Score>
        </Row>
        <Row>
          <Order fontSize={fontSize}>2</Order>
          <Name fontSize={fontSize}>あああ</Name>
          <Score fontSize={fontSize}>+100</Score>
        </Row>
        <Row>
          <Order fontSize={fontSize}>3</Order>
          <Name fontSize={fontSize}>しんにじえも</Name>
          <Score fontSize={fontSize}>+20</Score>
        </Row>
        <Row>
          <Order fontSize={fontSize}>4</Order>
          <Name fontSize={fontSize}>ぶりぶり</Name>
          <Score fontSize={fontSize}>-40</Score>
        </Row>
      </Players>
    </Wrapper>
  );
};

export { Ranking };

const Wrapper = styled.div`
  margin-left: 20px;
  width: 340px;
  min-width: 340px;
  ${media.lessThan('medium')`
    width: 100%;
    min-width: 100%;
    margin-left: 0;
    margin-top: 20px;
    margin-bottom: 70px;
  `}
`;

const Head = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const HeadText = styled(Typography)<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const Players = styled.div<{ fontSize: number }>`
  max-height: calc(100vh - ${({ fontSize }) => fontSize * 1.1}px - 148px);
  ${media.greaterThan('medium')`
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
  ${media.lessThan('medium')`
    max-height: auto;
  `}
`;

const Row = styled.div`
  display: flex;
  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;

const Cell = styled(Typography)<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  text-align: right;
  padding: 12px 8px;
  line-height: ${({ fontSize }) => fontSize + 4}px;
`;

const Order = styled(Cell)`
  min-width: ${({ fontSize }) => fontSize}px;
  max-width: ${({ fontSize }) => fontSize}px;
`;

const Name = styled(Cell)`
  flex-grow: 1;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const Score = styled(Cell)`
  margin-right: 10px;
`;
