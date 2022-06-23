import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

const LayoutProvider = () => {
  return (
    <Paper variant="outlined" sx={{ height: '100vh' }}>
      <Outlet />
    </Paper>
  );
};

export default LayoutProvider;
