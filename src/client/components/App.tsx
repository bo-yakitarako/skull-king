import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { fetchData } from '../actions/app';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <HeadBar />
          <MainContents />
          <SettingDialog />
          <ScoreSendDialog />
          <RegistrationDialog />
          <AddButton />
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};

export { App };
