import ConfigRoutes from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <BrowserRouter>
        <ConfigRoutes />
      </BrowserRouter>
    </ThemeConfig>
  );
};

export default App;
