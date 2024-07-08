import { FlowInside, FlowProvider } from '@/components/pages/flow-detail'
import { queryFlowDetailOption } from '@/lib/query-options/flow'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import '@/styles/react-flow.css'

const FlowDetail = () => {
  const { id: flowId } = useParams()
  const { data: flow } = useSuspenseQuery(
    queryFlowDetailOption(flowId as string),
  )
  // const updateChannelForTest = useUpdateChannelForTest()

  // useEffect(() => {
  //   updateChannelForTest.mutate(flowId as string)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [flowId])

  return (
    <FlowProvider flow={flow}>
      <FlowInside />
    </FlowProvider>
  )
}

export default FlowDetail
