import { cn } from '@/lib/utils'
import { TNode } from '@/types/flow'
import {
  Bolt,
  Check,
  CornerDownRight,
  GitPullRequest,
  HelpCircle,
  Mail,
  MessageSquareMore,
  Webhook,
  X,
} from 'lucide-react'
import { Handle, HandleProps, NodeProps, Position } from 'reactflow'
import { useFlowCtx } from '.'
import {
  SOURCE_HANDLE_PROMPT_NO,
  SOURCE_HANDLE_PROMPT_YES,
  SOURCE_HANDLE_VARIABLES_NO,
  SOURCE_HANDLE_VARIABLES_YES,
} from './constant'

type CustomNodeProps = NodeProps<
  TNode & {
    [key: string]: any
  }
>

const HandleCustom = ({
  className,
  children,
  ...props
}: Omit<HandleProps, 'isConnectable'> & {
  className?: string
  isConnectable?: any
  style?: React.CSSProperties
  children?: React.ReactNode
}) => {
  const { handleValidateConnection } = useFlowCtx()

  return (
    <Handle
      {...props}
      className={cn(' !bg-stone-600 !w-2 !h-2', className)}
      isValidConnection={handleValidateConnection}
    >
      {children ? children : null}
    </Handle>
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
      <HandleCustom type='source' position={Position.Right} />
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
      <HandleCustom type='target' position={Position.Left} />
    </div>
  )
}

export const NodeWrapper = (props?: {
  children: React.ReactNode
  className?: string
}) => {
  const { children, className } = props || {}
  return (
    <div className={cn('bg-card shadow rounded-md p-2 border-card', className)}>
      {children}
      <HandleCustom type='target' position={Position.Top} isConnectable={1} />
      <HandleCustom type='source' position={Position.Bottom} />
    </div>
  )
}

export const MessageNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <NodeWrapper>
      <div className='flex items-center gap-2'>
        <MessageSquareMore className='w-4 h-4' />
        <span className='leading-none'>{data?.name || data?.label}</span>
      </div>
    </NodeWrapper>
  )
}

export const PromptAndCollectNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <div className='bg-card shadow rounded-md p-2 border-card'>
      <div className='flex items-center gap-2'>
        <HelpCircle className='w-4 h-4' />
        <span className='leading-none'>{data?.name || data?.label}</span>
      </div>
      <HandleCustom type='target' position={Position.Top} />
      <HandleCustom
        type='source'
        position={Position.Bottom}
        id={SOURCE_HANDLE_PROMPT_NO}
        className='!w-4 !h-4 flex items-center justify-center !bg-red-500 !-bottom-2 text-white'
        style={{
          left: '80%',
        }}
      >
        <X className='w-2 h-2 pointer-events-none' />
      </HandleCustom>
      <HandleCustom
        type='source'
        position={Position.Bottom}
        id={SOURCE_HANDLE_PROMPT_YES}
        style={{
          left: '20%',
        }}
        className='!w-4 !h-4 flex items-center justify-center !bg-green-500 !-bottom-2 text-white'
      >
        <Check className='w-2 h-2 pointer-events-none' />
      </HandleCustom>
    </div>
  )
}

export const CheckVariablesNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <div className='bg-card shadow rounded-md p-2 border-card'>
      <div className='flex items-center gap-2'>
        <HelpCircle className='w-4 h-4' />
        <span className='leading-none'>{data?.name || data?.label}</span>
      </div>
      <HandleCustom type='target' position={Position.Top} isConnectable={1} />
      <HandleCustom
        type='source'
        position={Position.Bottom}
        id={SOURCE_HANDLE_VARIABLES_NO}
        className='!w-4 !h-4 flex items-center justify-center !bg-red-500 !-bottom-2 text-white'
        style={{
          left: '80%',
        }}
      >
        <X className='w-2 h-2 pointer-events-none' />
      </HandleCustom>
      <HandleCustom
        type='source'
        position={Position.Bottom}
        id={SOURCE_HANDLE_VARIABLES_YES}
        style={{
          left: '20%',
        }}
        className='!w-4 !h-4 flex items-center justify-center !bg-green-500 !-bottom-2 text-white'
      >
        <Check className='w-2 h-2 pointer-events-none' />
      </HandleCustom>
    </div>
  )
}

export const HttpRequestNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <NodeWrapper>
      <div className='flex items-center gap-2'>
        <GitPullRequest className='w-4 h-4' />
        <span className='leading-none'>{data?.name || data?.label}</span>
      </div>
    </NodeWrapper>
  )
}

export const SendMailNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <NodeWrapper>
      <div className='flex items-center gap-2'>
        <Mail className='w-4 h-4' />
        <span className='leading-none'>{data?.name || data?.label}</span>
      </div>
    </NodeWrapper>
  )
}

export const SubFlowNode = (props?: CustomNodeProps) => {
  const { data } = props || {}
  return (
    <NodeWrapper>
      <div className='flex items-center gap-2'>
        <CornerDownRight className='w-4 h-4' />
        <span className='leading-none'>{data?.name || data?.label}</span>
      </div>
    </NodeWrapper>
  )
}
