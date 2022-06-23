import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import shape from './shape';
import palette from './palette';
import typography from './typography';
import shadows, { customShadows } from './shadows';

const ThemeConfig = ({ children }) => {
  const themeOptions = useMemo(() => ({ palette, shape, typography, shadows, customShadows }), []);
  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeConfig;
