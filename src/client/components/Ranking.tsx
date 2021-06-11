import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useShallowEqualSelector } from '../hooks/useShallowEqualSelector';
import { media } from '../style/media';
import { useRanking } from '../hooks/useRanking';

const Ranking: React.FC = () => {
  const { fontSize, ownId } = useShallowEqualSelector(({ setting, user }) => ({
    fontSize: setting.fontSize,
    ownId: user.id,
  }));

  const users = useRanking();

  return (
    <Wrapper>
      <Head>
        <HeadText fontSize={fontSize}>ランキング</HeadText>
      </Head>
      <Players fontSize={fontSize}>
        {users.map(({ userId, rank, userName, scoreText }, index) => {
          const own = userId === ownId ? 'true' : 'false';
          return (
            <Row key={`${userName}${index}`}>
              <Order fontSize={fontSize} own={own}>
                {rank}
              </Order>
              <Name fontSize={fontSize} own={own}>
                {userName}
              </Name>
              <Score fontSize={fontSize} own={own}>
                {scoreText}
              </Score>
            </Row>
          );
        })}
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

const Cell = styled(Typography)<{ fontSize: number; own: 'true' | 'false' }>`
  font-size: ${({ fontSize }) => fontSize}px;
  text-align: right;
  padding: 12px 8px;
  line-height: ${({ fontSize }) => fontSize + 4}px;
  ${({ own, theme }) =>
    own === 'true' && `color: ${theme.palette.secondary.main};`}
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
