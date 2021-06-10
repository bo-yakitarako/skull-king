import React from 'react';
import styled from 'styled-components';
import { media } from '../style/media';
import { DataTable } from './DataTable';

const MainContents: React.FC = () => {
  return (
    <MainWrapper>
      <DataTable />
    </MainWrapper>
  );
};

export { MainContents };

const MainWrapper = styled.main`
  display: flex;
  padding: 20px 20px 0;
  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 20px 10px 10px;
  `}
`;
