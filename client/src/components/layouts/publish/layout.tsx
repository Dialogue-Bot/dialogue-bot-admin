import Header from './header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
};

export default Layout;
