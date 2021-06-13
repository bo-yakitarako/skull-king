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
import { AddButton } from './AddButton';
import { RegistrationDialog } from './dialogs/RegistrationDialog';
import { ResetDialog } from './dialogs/ResetDialog';

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <HeadBar />
          <MainContents />
          <SettingDialog />
          <ScoreSendDialog />
          <RegistrationDialog />
          <ResetDialog />
          <AddButton />
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};

export { App };
