import { API_URL } from '@/constants'
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
        API_URL={API_URL}
      />
    </div>
  )
}

export default ConversationDetail
