import React, { useState } from 'react';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import styled, {
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import { useWebSocket } from '../hooks/useWebSocket';
import { useSelector } from '../hooks/useSelector';
import { theme } from '../modules/theme';

const App: React.FC = () => {
  const comment = useSelector(({ comment }) => comment);
  const [message, setMessage] = useState('');
  const { sendMessage } = useWebSocket();
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <br />
          <Button onClick={() => sendMessage(message)}>送信</Button>
          <div>{comment}</div>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};

export { App };

const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;
