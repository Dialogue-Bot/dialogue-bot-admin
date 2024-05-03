import { ChatBox } from 'dialogue-chatbox'
import { useParams } from 'react-router-dom'

const ConversationDetail = () => {
  const { userId, channelId } = useParams()

  return (
    <div>
      <ChatBox
        channelId={channelId}
        userId={userId}
        isShowClose={false}
        className='shadow-none'
        isForManager
      />
    </div>
  )
}

export default ConversationDetail
