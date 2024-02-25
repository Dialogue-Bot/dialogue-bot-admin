import { Outlet } from '@tanstack/react-router';
import Sidebar from './sidebar';
export const Layout = () => {
   return (
      <div className="flex min-h-svh ">
         <Sidebar />
         <div className="ml-sidebar w-full">
            <Outlet />
         </div>
      </div>
   );
};

export default Layout;
