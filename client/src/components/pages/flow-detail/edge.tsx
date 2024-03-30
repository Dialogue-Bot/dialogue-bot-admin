import { Button } from '@/components/ui'
import { X } from 'lucide-react'
import { BaseEdge, EdgeProps, getSmoothStepPath } from 'reactflow'
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
  },
}: EdgeProps<{
  deletable?: boolean
}>) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })
  const { handleDeleteEdgeById } = useFlowCtx()

  useUnmount(() => {
    handleDeleteEdgeById(id)
  })

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
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
