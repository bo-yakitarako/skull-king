import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#607D8B',
      light: '#CFD8DC',
      dark: '#455A64',
    },
    secondary: {
      main: '#FF5252',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#BDBDBD',
  },
});

export { theme };
