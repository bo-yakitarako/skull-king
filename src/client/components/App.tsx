import React from 'react';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../style/theme';
import { HeadBar } from './HeadBar';
import { MainContents } from './MainContents';
import { SettingDialog } from './dialogs/SettingDialog';
import { ScoreSendDialog } from './dialogs/ScoreSendDialog';

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <HeadBar />
          <MainContents />
          <SettingDialog />
          <ScoreSendDialog />
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};

export { App };
