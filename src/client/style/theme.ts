import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#673AB7',
      light: '#D1C4E9',
      dark: '#512DA8',
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
