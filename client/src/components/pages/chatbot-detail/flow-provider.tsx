import { TFlowInput } from '@/lib/schema/flow-input'
import { createContext, useContext } from 'react'

type FlowCtx = {
  flow: TFlowInput
}

const FlowContext = createContext<FlowCtx | undefined>(undefined)

type Props = {
  flow: TFlowInput
  children: React.ReactNode
}

export const FlowProvider = ({ children, flow }: Props) => {
  return (
    <FlowContext.Provider value={{ flow }}>{children}</FlowContext.Provider>
  )
}

export const useFlowCtx = () => {
  const ctx = useContext(FlowContext)
  if (!ctx) {
    throw new Error('useFlowCtx must be used within a FlowProvider')
  }
  return ctx
}
