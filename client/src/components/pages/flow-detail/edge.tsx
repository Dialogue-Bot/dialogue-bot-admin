import { Button } from '@/components/ui'
import { X } from 'lucide-react'
import { BaseEdge, EdgeProps, useReactFlow, getBezierPath } from 'reactflow'

const foreignObjectSize = 16

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
  const { setEdges } = useReactFlow()
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const handleDelete = () => {
    if (!data?.deletable) return

    setEdges((edges) => edges.filter((edge) => edge.id !== id))
  }

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
            onClick={handleDelete}
          >
            <X className='w-2 h-2' />
          </Button>
        </foreignObject>
      )}
    </>
  )
}
