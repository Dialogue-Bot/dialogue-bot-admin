import { Button } from '@/components/ui'
import { Maximize, Minus, Plus } from 'lucide-react'
import { useLayoutEffect } from 'react'
import { Panel, useViewport, useReactFlow } from 'reactflow'

const MAX_ZOOM = 2
const MIN_ZOOM = 0.5

export const Controls = () => {
  const { x, y, zoom } = useViewport()
  const { setViewport } = useReactFlow()

  const zoomPercent = Math.round((zoom - 1) * 100)

  const handleZoomIn = () => {
    setViewport({
      zoom: zoom >= MAX_ZOOM ? MAX_ZOOM : zoom + 0.25,
      x,
      y,
    })
  }

  const handleZoomOut = () => {
    setViewport({
      zoom: zoom <= MIN_ZOOM ? MIN_ZOOM : zoom - 0.25,
      x,
      y,
    })
  }

  const handleFitView = () => {
    setViewport({
      zoom: 2,
      x: 0,
      y: 0,
    })
  }

  useLayoutEffect(() => {
    setViewport({
      zoom: 1.5,
      x: 0,
      y: 0,
    })
  }, [setViewport])

  return (
    <Panel position='bottom-left'>
      <div className='flex h-12 items-center bg-card shadow px-2 select-none gap-2 rounded-md'>
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost' onClick={handleZoomIn}>
            <Plus className='w-4 h-4' />
          </Button>
          <span className='w-9 h-9 flex items-center justify-center'>
            {zoomPercent > 100 ? '100%' : `${zoomPercent}%`}
          </span>
          <Button size='icon' variant='ghost' onClick={handleZoomOut}>
            <Minus className='w-4 h-4' />
          </Button>
        </div>
        <Button size='icon' variant='ghost' onClick={handleFitView}>
          <Maximize className='w-4 h-4' />
        </Button>
      </div>
    </Panel>
  )
}
