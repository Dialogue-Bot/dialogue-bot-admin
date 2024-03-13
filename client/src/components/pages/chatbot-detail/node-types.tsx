import { TNodeTypes } from '@/types/flow'
import { MessageNode, StartNode } from './nodes'

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
}
