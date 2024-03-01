import Sidebar from './sidebar';
import { Header } from './header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
   return (
      <div className="flex min-h-svh ">
         <Header />
         <Sidebar />
         <div className="ml-sidebar w-full mt-header">
            <Outlet />
         </div>
      </div>
   );
};

export default Layout;
