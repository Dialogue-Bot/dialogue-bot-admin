import { queryChannelForTestOption } from '@/lib/query-options'
import { cn } from '@/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChatBox } from 'dialogue-chatbox'
import { useParams } from 'react-router-dom'
import { useFlowCtx } from '.'

const TestYourBot = () => {
  const { id } = useParams()
  const { data: channel } = useSuspenseQuery(
    queryChannelForTestOption(id as string),
  )

  const { showTestBot } = useFlowCtx()

  return (
    showTestBot && (
      <div
        className={cn(
          'fixed right-4 z-10 rounded-md shadow w-80 transition-transform duration-300 bottom-4 flex flex-col gap-4 bg-white h-[500px] overflow-hidden',
        )}
      >
        <ChatBox
          channelId={channel.contactId}
          className='h-full w-full'
          isTest
          isShowClose={false}
        />
      </div>
    )
  )
}

export default TestYourBot
