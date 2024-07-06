import { TNodeTypes } from '@/types/flow'
import {
  CheckVariablesNode,
  FallBackNode,
  GotoNode,
  HttpRequestNode,
  MessageNode,
  PromptAndCollectNode,
  SendMailNode,
  StartNode,
  SubFlowNode,
} from './nodes'

/**
 * Represents the available node types.
 * @example
 * const nodeTypes: TNodeTypes = {
 *      start: StartNodeComponent,
 * }
 */
export const nodeTypes: TNodeTypes = {
  start: StartNode,
  message: MessageNode,
  fallback: FallBackNode,
  'prompt-and-collect': PromptAndCollectNode,
  'check-variables': CheckVariablesNode,
  'http-request': HttpRequestNode,
  'send-mail': SendMailNode,
  'sub-flow': SubFlowNode,
  goto: GotoNode,
}
