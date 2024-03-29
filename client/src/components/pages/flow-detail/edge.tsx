import { Button } from '@/components/ui'
import _ from 'lodash'
import { X } from 'lucide-react'
import { BaseEdge, EdgeProps, getSmoothStepPath, useReactFlow } from 'reactflow'
import { useUnmount } from 'usehooks-ts'

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
  source,
  target,
}: EdgeProps<{
  deletable?: boolean
}>) => {
  const { setEdges, getNode, setNodes } = useReactFlow()
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  /**
   * Handles the delete action for an edge.
   * If the edge is not deletable or the source node does not exist, the function returns early.
   * If the source node exists, it creates a deep clone of the node and modifies its data accordingly.
   * Finally, it updates the nodes and edges state to reflect the changes.
   */
  const handleDelete = () => {
    if (!data?.deletable) return

    const sourceNode = getNode(source)

    if (sourceNode) {
      const cloned = _.cloneDeep(sourceNode)

      if (cloned.data?.nextAction) {
        delete cloned.data.nextAction
      }

      if (cloned.data?.nextActions) {
        cloned.data.nextActions = cloned.data.nextActions.filter(
          (nextAction: any) => nextAction.id !== target,
        )

        if (cloned.data.nextActions.length === 0) {
          delete cloned.data.nextActions
        }
      }

      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === source) {
            return cloned
          }

          return node
        }),
      )
    }

    setEdges((edges) => edges.filter((edge) => edge.id !== id))
  }

  useUnmount(() => {
    console.log('edge unmount')
    handleDelete()
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
            onClick={handleDelete}
          >
            <X className='w-2 h-2' />
          </Button>
        </foreignObject>
      )}
    </>
  )
}
