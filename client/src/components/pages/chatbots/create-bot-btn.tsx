import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';

/**
 * Props for the CreateBotBtn component.
 */
type Props = {
   onCreate?: () => void;
};

/**
 * Renders a button component for creating a bot.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onCreate - The callback function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button component.
 */
export const CreateBotBtn = ({ onCreate }: Props) => {
   return (
      <Button className="min-h-48 flex flex-col py-4" onClick={onCreate}>
         <Plus />
         <span>Create Bot</span>
      </Button>
   );
};
