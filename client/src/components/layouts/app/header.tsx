import { useAppLayoutStore } from '@/store/use-app-layout';

export const Header = () => {
   const { title } = useAppLayoutStore();
   return (
      <header className="fixed h-header left-sidebar top-0 right-0 bg-background border-b border-border shadow-sm px-6 flex items-center">
         <span className="text-lg font-semibold">{title}</span>
      </header>
   );
};
