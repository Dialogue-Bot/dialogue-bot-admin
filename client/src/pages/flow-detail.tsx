import { FlowInside, FlowProvider } from '@/components/pages/flow-detail'
import { queryFlowDetailOption } from '@/lib/query-options/flow'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useUpdateChannelForTest } from '@/hooks/channel'
import '@/styles/react-flow.css'

import { useEffect } from 'react'

const FlowDetail = () => {
  const { id: flowId } = useParams()
  const { data: flow } = useSuspenseQuery(
    queryFlowDetailOption(flowId as string),
  )
  const updateChannelForTest = useUpdateChannelForTest()

  useEffect(() => {
    updateChannelForTest.mutate(flowId as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowId])

  return (
    <FlowProvider flow={flow}>
      <FlowInside />
    </FlowProvider>
  )
}

export default FlowDetail
