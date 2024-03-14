import { cn } from '@/lib/utils'
import { Bolt, MessageSquareMore } from 'lucide-react'
import { useMemo } from 'react'
import {
  Handle,
  HandleProps,
  Node,
  Position,
  getConnectedEdges,
  useNodeId,
  useStore,
} from 'reactflow'

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

export const StartNode = () => {
  return (
    <div className='bg-green-500 rounded-md overflow-hidden shadow'>
      <div className='flex items-center gap-2 p-2 text-white font-medium text-sm shadow'>
        <Bolt className='w-4 h-4' />
        <span className='leading-none'>Start</span>
      </div>
      <HandleCustom type='source' position={Position.Right} />
    </div>
  )
}

export const NodeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-card shadow rounded-md p-2 border-card'>
      {children}
      <HandleCustom type='target' position={Position.Left} isConnectable={1} />
      <HandleCustom type='source' position={Position.Right} />
    </div>
  )
}

export const MessageNode = () => {
  return (
    <NodeWrapper>
      <div className='flex items-center gap-2'>
        <MessageSquareMore className='w-4 h-4' />
        <span className='leading-none'>Message</span>
      </div>
    </NodeWrapper>
  )
}
