import ReactFlow, { Background, BackgroundVariant } from 'reactflow'
import { Actions } from './actions'
import { Controls } from './controls'
import { edgeTypes } from './edge-types'
import { useFlowCtx } from './flow-provider'
import { NodeDialog } from './node-dialog'
import { nodeTypes } from './node-types'
import { Toolbar } from './toolbar'

export const FlowInside = () => {
  const {
    edges,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    handleDragOver,
    handleDrop,
    handleInit,
    handleDoubleClickNode,
  } = useFlowCtx()

  return (
    <div className='h-svh select-none'>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onInit={handleInit}
        onNodeDoubleClick={handleDoubleClickNode}
      >
        <Background
          gap={24}
          variant={BackgroundVariant.Dots}
          color={'hsl(var(--primary))'}
        />
        <Controls />
      </ReactFlow>
      <Toolbar />
      <Actions />
      <NodeDialog />
    </div>
  )
}

export default FlowInside
