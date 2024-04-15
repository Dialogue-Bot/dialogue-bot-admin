import { ChatBox } from 'dialogue-chatbox'
import { useParams } from 'react-router-dom'

const ConversationDetail = () => {
  const { userId, channelId } = useParams()

  console.log('userId:', userId)
  console.log('channelId:', channelId)

  return (
    <div>
      <ChatBox
        channelId={channelId}
        userId={userId}
        isShowClose={false}
        className='shadow-none'
      />
    </div>
  )
}

export default ConversationDetail
