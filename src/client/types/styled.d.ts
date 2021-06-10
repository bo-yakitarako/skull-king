import 'styled-components';
import { Theme } from '@material-ui/core';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    palette: {
      primary: {
        main: string;
        light: string;
        dark: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      divider: string;
    };
  }
}
