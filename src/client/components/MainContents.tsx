import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@material-ui/core';
import { useShallowEqualSelector } from '../hooks/useShallowEqualSelector';
import { media } from '../style/media';
import { DataTable } from './DataTable';
import { Ranking } from './Ranking';

const MainContents: React.FC = () => {
  const { fetched, isExistsUser } = useShallowEqualSelector(
    ({ fetched, data }) => ({
      fetched,
      isExistsUser: data.length > 0,
    }),
  );

  if (!fetched) {
    return (
      <SubWrapper>
        <CircularProgress />
      </SubWrapper>
    );
  }

  if (!isExistsUser) {
    return (
      <SubWrapper>
        <Typography>誰もいねえじゃねえか(ﾟДﾟ)ｺﾞﾙｧ!!</Typography>
      </SubWrapper>
    );
  }

  return (
    <MainWrapper>
      <DataTable />
      <Ranking />
    </MainWrapper>
  );
};

export { MainContents };

const MainWrapper = styled.main`
  display: flex;
  padding: 20px 20px 0;
  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 20px 0;
  `}
`;

const SubWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px);
`;
