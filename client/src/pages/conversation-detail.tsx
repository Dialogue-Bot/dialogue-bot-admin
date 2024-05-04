import { useUserStore } from '@/store'
import { ChatBox } from 'dialogue-chatbox'
import { useParams } from 'react-router-dom'

const ConversationDetail = () => {
  const { userId, channelId } = useParams()
  const { user } = useUserStore()

  return (
    <div>
      <ChatBox
        channelId={channelId}
        userId={userId}
        isShowClose={false}
        className='shadow-none'
        isForManager
        adminId={user?.id as string}
      />
    </div>
  )
}

export default ConversationDetail
