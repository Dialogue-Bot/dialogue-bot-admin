import { cn } from '@/lib/utils'
import { Bolt, MessageSquareMore, Webhook } from 'lucide-react'
import { useMemo } from 'react'
import {
  Handle,
  HandleProps,
  Node,
  NodeProps,
  Position,
  getConnectedEdges,
  useNodeId,
  useStore,
} from 'reactflow'

type CustomNodeProps = NodeProps<{
  label: string
  [key: string]: any
}>

const HandleCustom = ({
  className,
  ...props
}: Omit<HandleProps, 'isConnectable'> & {
  className?: string
  isConnectable?: any
}) => {
  const { nodeInternals, edges } = useStore((s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
  }))

  const nodeId = useNodeId()

  const isHandleConnectable = useMemo(() => {
    if (!nodeId) return false

    if (typeof props.isConnectable === 'function') {
      const node = nodeInternals.get(nodeId)
      const connectedEdges = getConnectedEdges([node as Node], edges)

      const isConnectable = props.isConnectable as any

      return isConnectable({ node, connectedEdges })
    }

    if (typeof props.isConnectable === 'number') {
      const node = nodeInternals.get(nodeId)
      const connectedEdges = getConnectedEdges([node as Node], edges)

      return connectedEdges.length < props.isConnectable
    }

    return props.isConnectable
  }, [props, nodeInternals, nodeId, edges])

  return (
    <Handle
      {...props}
      className={cn(' !bg-stone-600 !w-2 !h-2', className)}
      isConnectable={isHandleConnectable}
    />
  )
}

export const StartNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <div className='bg-green-500 rounded-md overflow-hidden shadow'>
      <div className='flex items-center gap-2 p-2 text-white font-medium text-sm shadow'>
        <Bolt className='w-4 h-4' />
        <span className='leading-none'>{data?.label}</span>
      </div>
      <HandleCustom type='source' position={Position.Right} isConnectable={2} />
    </div>
  )
}

export const FallBackNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <div className='bg-gray-500 rounded-md overflow-hidden shadow'>
      <div className='flex items-center gap-2 p-2 text-white font-medium text-sm shadow'>
        <Webhook className='w-4 h-4' />
        <span className='leading-none'>{data?.label}</span>
      </div>
      <HandleCustom type='target' position={Position.Left} isConnectable={1} />
    </div>
  )
}

export const NodeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-card shadow rounded-md p-2 border-card'>
      {children}
      <HandleCustom type='target' position={Position.Left} isConnectable={2} />
      <HandleCustom type='source' position={Position.Right} isConnectable={2} />
    </div>
  )
}

export const MessageNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <NodeWrapper>
      <div className='flex items-center gap-2'>
        <MessageSquareMore className='w-4 h-4' />
        <span className='leading-none'>{data?.label}</span>
      </div>
    </NodeWrapper>
  )
}
