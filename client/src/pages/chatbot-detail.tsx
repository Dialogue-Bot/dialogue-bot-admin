import { FlowInside, FlowProvider } from '@/components/pages/flow-detail'
import { queryFlowDetailOption } from '@/lib/query-options/flow'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import '@/styles/react-flow.css'

const ChatBotDetail = () => {
  const { id: flowId } = useParams()
  const { data: flow } = useSuspenseQuery(
    queryFlowDetailOption(flowId as string),
  )

  return (
    <FlowProvider flow={flow}>
      <FlowInside />
    </FlowProvider>
  )
}

export default ChatBotDetail
