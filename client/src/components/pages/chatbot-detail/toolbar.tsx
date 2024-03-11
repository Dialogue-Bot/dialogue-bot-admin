import {
   Button,
   Separator,
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui';
import { Settings2, Zap } from 'lucide-react';
import { Panel } from 'reactflow';
import Setting from './setting';

export const Toolbar = () => {
   return (
      <Panel position="top-right">
         <div className="flex h-12 items-center bg-card shadow px-2 select-none gap-2 rounded-md">
            <div className="flex items-center gap-2">
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost">
                           <Zap className="w-4 h-4" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent sideOffset={10}>
                        <p>Add to library</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>

               <TooltipProvider>
                  <Tooltip>
                     <Setting>
                        <TooltipTrigger>
                           <Button size="icon" variant="ghost">
                              <Settings2 className="w-4 h-4" />
                           </Button>
                        </TooltipTrigger>
                     </Setting>
                     <TooltipContent sideOffset={10}>
                        <p>Add to library</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <Separator
                  orientation="vertical"
                  className="self-stretch h-[unset]"
               />
               <Button variant="ghost">Test your bot</Button>
               <Button variant="default">Publish</Button>
            </div>
         </div>
      </Panel>
   );
};
