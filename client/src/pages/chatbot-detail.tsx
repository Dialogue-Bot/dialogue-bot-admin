import {
  Controls,
  FlowProvider,
  nodeTypes,
} from '@/components/pages/chatbot-detail'
import { Toolbar } from '@/components/pages/chatbot-detail/toolbar'
import { queryFlowDetailOption } from '@/lib/query-options/flow'
import { EActionTypes } from '@/types/flow'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactFlow, {
  Background,
  BackgroundVariant,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import '@/styles/react-flow.css'
import { edgeTypes } from '@/components/pages/chatbot-detail/ede-types'

const ChatBotDetail = () => {
  const { id: flowId } = useParams()
  const { data: flow } = useSuspenseQuery(
    queryFlowDetailOption(flowId as string),
  )
  const [nodes, _setNodes, onNodesChange] = useNodesState([
    {
      id: EActionTypes.START,
      type: EActionTypes.START,
      position: { x: 100, y: 100 },
      data: {
        label: 'Start',
        type: EActionTypes.START,
        id: EActionTypes.START,
        name: 'Start',
      },
      deletable: false,
    },
    {
      id: '2',
      type: EActionTypes.MESSAGE,
      position: { x: 250, y: 100 },
      data: { label: 'Message' },
    },
    {
      id: '3',
      type: EActionTypes.MESSAGE,
      position: { x: 250, y: 100 },
      data: { label: 'Message' },
    },
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        if (eds.length > 0) {
          console.log({
            params,
            eds,
          })

          if (
            params.source === EActionTypes.START &&
            eds.some((edge) => edge.source === EActionTypes.START)
          ) {
            return eds
          }
        }

        return addEdge(
          {
            ...params,
            type: 'custom',
          },
          eds,
        )
      })
    },
    [setEdges],
  )

  return (
    <FlowProvider flow={flow}>
      <div className='h-svh select-none'>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
        >
          <Background
            gap={24}
            variant={BackgroundVariant.Dots}
            color={'hsl(var(--primary))'}
          />
          <Controls />
          <Toolbar />
        </ReactFlow>
      </div>
    </FlowProvider>
  )
}

export default ChatBotDetail
