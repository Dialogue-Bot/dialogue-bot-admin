import { ROUTES } from '@/constants'
import { TConversation } from '@/types/live-chat'
import { useNavigate } from 'react-router-dom'

type Props = {
  conversation: TConversation
}

export const ConversationItem = ({ conversation }: Props) => {
  const navigate = useNavigate()
  return (
    <div
      className='p-4 border-b border-input'
      onClick={() => {
        navigate(
          `${ROUTES.PRIVATE.CONVERSATION.INDEX}/${conversation.userId}/${conversation.channelId}`,
        )
      }}
    >
      <div>
        <span>
          {conversation.userId} - {conversation.channel.contactName}
        </span>
      </div>
    </div>
  )
}

export default ConversationItem
