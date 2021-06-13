import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { useDialog } from '../hooks/useDialog';
import { useRegistation } from '../hooks/useRegistration';
import { useScoreEdit } from '../hooks/useScoreEdit';

const AddButton: React.FC = () => {
  const [, openDialog] = useDialog('scoreSend');
  const [registered] = useRegistation();
  const { canAddScore } = useScoreEdit();
  return (
    <>
      {registered && canAddScore && (
        <ButtonLayout>
          <Fab color="secondary" onClick={openDialog}>
            <Add />
          </Fab>
        </ButtonLayout>
      )}
    </>
  );
};

export { AddButton };

const ButtonLayout = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
`;
