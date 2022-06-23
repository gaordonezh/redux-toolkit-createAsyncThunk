import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from './Loadable';

const Layout = Loadable(lazy(() => import('../layout')));
// ----------------------------------------------------------------------
const Page404 = Loadable(lazy(() => import('../views/error/Page404')));
// ----------------------------------------------------------------------
const Home = Loadable(lazy(() => import('../views/Home')));

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default ConfigRoutes;
