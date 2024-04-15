import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import { TConversation } from '@/types/live-chat'
import { NavLink } from 'react-router-dom'

type Props = {
  conversation: TConversation
}

export const ConversationItem = ({ conversation }: Props) => {
  return (
    <NavLink
      to={`${ROUTES.PRIVATE.CONVERSATION.INDEX}/${conversation.userId}/${conversation.channel.contactId}`}
      className={({ isActive }) =>
        cn(
          'p-4 border-b border-input select-none cursor-pointer hover:bg-muted block',
          {
            'bg-muted': isActive,
          },
        )
      }
    >
      <div>
        <span className='font-medium'>
          {conversation.userId} - {conversation.channel.contactName}
        </span>
      </div>
    </NavLink>
  )
}

export default ConversationItem
