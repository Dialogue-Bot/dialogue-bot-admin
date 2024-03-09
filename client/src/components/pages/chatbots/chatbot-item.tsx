import {
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   buttonVariants,
} from '@/components/ui';
import { ROUTES } from '@/constants';
import { Link } from 'react-router-dom';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

type Props = {
   chatbot: {
      id: string;
      name: string;
   };
};

export const ChatBotItem = ({ chatbot }: Props) => {
   return (
      <div className="relative w-full h-full flex min-h-48">
         <Link
            to={`${ROUTES.PRIVATE.CHAT_BOT.INDEX}/${chatbot.id}`}
            className={buttonVariants({
               variant: 'outline',
               className:
                  '!p-4 h-[unset] hover:border-primary hover:ring-primary hover:ring-1 flex-1',
            })}
         >
            <h3>{chatbot.name}</h3>
         </Link>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                     e.stopPropagation();
                  }}
                  className=" top-2 right-2 absolute z-10"
               >
                  <DotsHorizontalIcon />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuItem>Rename</DropdownMenuItem>
               <DropdownMenuItem>Remove</DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
