import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { useBlocker } from 'react-router-dom'
import ReactFlow, { Background, BackgroundVariant } from 'reactflow'
import { Actions } from './actions'
import ConditionDialog from './condition-dialog'
import { Controls } from './controls'
import { edgeTypes } from './edge-types'
import { useFlowCtx } from './flow-provider'
import { NodeDialog } from './node-dialog'
import { nodeTypes } from './node-types'
import TestYourBot from './test-your-bot'
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
    handleDoubleClickEdge,
    flow,
    handleNodesDelete,
    handleEdgeMouseEnter,
    handleEdgeMouseLeave,
  } = useFlowCtx()
  const { t } = useTranslation('common')

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return (
      (JSON.stringify(nodes) !== JSON.stringify(flow.nodes) ||
        JSON.stringify(edges) !== JSON.stringify(flow.edges)) &&
      currentLocation.pathname !== nextLocation.pathname
    )
  })

  return (
    <div className='h-svh select-none'>
      <AlertDialog open={blocker.state === 'blocked'}>
        <AlertDialogTrigger asChild>
          <div className='hidden'></div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('leave_page_unsaved.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('leave_page_unsaved.desc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                blocker.reset?.()
              }}
            >
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                blocker.proceed?.()
              }}
            >
              {t('confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
        onEdgeDoubleClick={handleDoubleClickEdge}
        onNodesDelete={handleNodesDelete}
        onEdgeMouseEnter={handleEdgeMouseEnter}
        onEdgeMouseLeave={handleEdgeMouseLeave}
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
      <ConditionDialog />
      <TestYourBot />
    </div>
  )
}

export default FlowInside
