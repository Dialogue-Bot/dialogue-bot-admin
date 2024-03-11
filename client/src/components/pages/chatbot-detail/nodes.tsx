import { cn } from '@/lib/utils';
import { Bolt } from 'lucide-react';
import { Handle, HandleProps, Position } from 'reactflow';

const HandleCustom = ({
   className,
   ...props
}: HandleProps & {
   className?: string;
}) => {
   return (
      <Handle
         {...props}
         className={cn(' !bg-stone-600 !w-2 !h-2', className)}
      />
   );
};

export const StartNode = () => {
   return (
      <div className="bg-green-500 rounded-md overflow-hidden shadow">
         <div className="flex items-center gap-2 p-2 text-white font-medium text-sm shadow">
            <Bolt className="w-4 h-4" />
            <span className="leading-none">Start</span>
         </div>
         <HandleCustom type="source" position={Position.Right} />
      </div>
   );
};

export const NodeWrapper = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="bg-card shadow rounded-md p-4 border-card">
         {children}
         <HandleCustom type="target" position={Position.Left} />
         <HandleCustom type="source" position={Position.Right} />
      </div>
   );
};

export const MessageNode = () => {
   return (
      <NodeWrapper>
         <div className="flex items-center gap-2">
            <Bolt className="w-4 h-4" />
            <span className="leading-none">Message</span>
         </div>
      </NodeWrapper>
   );
};
