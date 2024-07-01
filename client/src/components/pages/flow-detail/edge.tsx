import { Button } from '@/components/ui'
import { EActionTypes } from '@/types/flow'
import _ from 'lodash'
import { X } from 'lucide-react'
import { useMemo } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from 'reactflow'
import { useUnmount } from 'usehooks-ts'
import { useFlowCtx } from '.'

const foreignObjectSize = 16

// million-ignore
export const Edge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = {
    deletable: true,
    hover: false,
  },
  source,
  target,
  selected,
}: EdgeProps<{
  deletable?: boolean
  hover?: boolean
}>) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })
  const { handleDeleteEdgeById, getNode } = useFlowCtx()
  const node = useMemo(() => getNode(source), [getNode, source])

  const action = node?.data?.nextActions
    ? node.data.nextActions.find((a: any) => a.id === target)
    : null

  useUnmount(() => {
    handleDeleteEdgeById(id)
  })

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {(node?.data.action === EActionTypes.PROMPT_AND_COLLECT ||
        node?.data.action === EActionTypes.CHECK_VARIABLES ||
        node?.data.action === EActionTypes.HTTP_REQUEST) &&
      !selected &&
      !data.hover &&
      action ? (
        <EdgeLabelRenderer>
          <span
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px`,
            }}
            className='edge-label nodrap nopan absolute bg-white text-xs'
          >
            {_.capitalize(action.condition).replace(/_/g, ' ')}
            {typeof action.value === 'boolean'
              ? `: ${action.value ? 'true' : 'false'}`
              : null}
          </span>
        </EdgeLabelRenderer>
      ) : null}
      <path
        id={id}
        style={style}
        className='react-flow__edge-path edge-outline opacity-0'
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data?.deletable && (
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={labelX - foreignObjectSize / 2}
          y={labelY - foreignObjectSize / 2}
          className='edgebutton flex items-center justify-center  '
          requiredExtensions='http://www.w3.org/1999/xhtml'
        >
          <Button
            size='icon'
            className='w-4 h-4 opacity-0 scale-50 invisible btn'
            variant='destructive'
            onClick={() => handleDeleteEdgeById(id)}
          >
            <X className='w-2 h-2' />
          </Button>
        </foreignObject>
      )}
    </>
  )
}
