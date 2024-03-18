import { TFlowInput } from '@/lib/schema/flow-input'
import { EActionTypes } from '@/types/flow'
import { createId } from '@paralleldrive/cuid2'
import {
  DragEvent,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import { useToggle } from 'usehooks-ts'
import { useMapActionToLabel } from './constant'

type FlowCtx = {
  flow: TFlowInput
  openActions: boolean
  toggleActions: () => void
  nodes: Node<any>[]
  edges: Edge<any>[]
  onConnect: OnConnect
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  handleInit: (instance: ReactFlowInstance<any, any>) => void
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void
  handleDrop: (event: DragEvent<HTMLDivElement>) => void
}

const FlowContext = createContext<FlowCtx | undefined>(undefined)

type Props = {
  flow: TFlowInput
  children: React.ReactNode
}

export const FlowProvider = ({ children, flow }: Props) => {
  const [open, toggle] = useToggle()
  const actionToLabel = useMapActionToLabel()
  const [nodes, setNodes, onNodesChange] = useNodesState([
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
      id: EActionTypes.FALLBACK,
      type: EActionTypes.FALLBACK,
      position: { x: 190, y: 280 },
      data: {
        label: 'Fallback',
        type: EActionTypes.FALLBACK,
        id: EActionTypes.FALLBACK,
        name: 'Fallback',
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
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: 'start-fallback',
      source: EActionTypes.START,
      target: EActionTypes.FALLBACK,
      type: 'custom',
      data: {
        deletable: false,
      },
    },
  ])

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    any,
    any
  > | null>(null)

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop = useCallback(
    (event: any) => {
      event.preventDefault()

      if (!reactFlowInstance) {
        return
      }

      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })
      const newNode = {
        id: createId(),
        type,
        position,
        data: {
          label: actionToLabel[type as EActionTypes],
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, actionToLabel],
  )

  const handleInit = useCallback((instance: ReactFlowInstance<any, any>) => {
    setReactFlowInstance(instance)
  }, [])

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        return addEdge(
          {
            ...params,
            type: 'custom',
            data: {
              deletable: params.target !== EActionTypes.FALLBACK,
            },
          },
          eds,
        )
      })
    },
    [setEdges],
  )

  const getNode = useCallback(
    (id: string) => nodes.find((node) => node.id === id),
    [nodes],
  )

  const getEdge = useCallback(
    (id: string) => edges.find((edge) => edge.id === id),
    [edges],
  )

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      console.log('change', changes)

      const nextChanges = changes.reduce((acc, change) => {
        // Remove the edge if it's a custom edge and the target is the fallback node

        if (change.type === 'remove') {
          const edge = getEdge(change.id)

          if (
            edge?.type === 'custom' &&
            edge.target === EActionTypes.FALLBACK
          ) {
            return acc
          }

          return [...acc, change]
        }

        return [...acc, change]
      }, [] as EdgeChange[])

      onEdgesChange(nextChanges)
    },
    [getEdge, onEdgesChange],
  )

  return (
    <FlowContext.Provider
      value={{
        flow,
        openActions: open,
        toggleActions: toggle,
        nodes,
        edges,
        onConnect,
        onNodesChange,
        onEdgesChange: handleEdgesChange,
        handleInit,
        handleDragOver,
        handleDrop,
      }}
    >
      {children}
    </FlowContext.Provider>
  )
}

export const useFlowCtx = () => {
  const ctx = useContext(FlowContext)
  if (!ctx) {
    throw new Error('useFlowCtx must be used within a FlowProvider')
  }
  return ctx
}
