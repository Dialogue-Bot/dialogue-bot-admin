import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { EActionTypes } from '@/types/flow'
import { X } from 'lucide-react'
import { DragEvent, useCallback, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '.'
import { ACTIONS, useMapActionToLabel } from './constant'

export const Actions = () => {
  const { t } = useTranslation('flowDetail')
  const { openActions, toggleActions } = useFlowCtx()
  const actionsRef = useRef<HTMLDivElement>(null)
  const actionToLabel = useMapActionToLabel()

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, type: EActionTypes) => {
      e.dataTransfer.setData('application/reactflow', type)
      e.dataTransfer.effectAllowed = 'move'
    },
    [],
  )

  useLayoutEffect(() => {
    const toolbar = document.querySelector('#flow-toolbar')

    if (!toolbar || !actionsRef.current) return

    const toolbarRect = toolbar.getBoundingClientRect()

    actionsRef.current.style.top = `${toolbarRect.bottom + 16}px`
  }, [])

  return (
    <div
      className={cn(
        'fixed right-4 z-10 rounded-md bg-card shadow w-80 transition-transform duration-300 bottom-4 p-4 flex flex-col gap-4',
        {
          'translate-x-[110%]': !openActions,
        },
      )}
      ref={actionsRef}
    >
      <div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-semibold leading-none tracking-tight'>
            {t('actions.title')}
          </span>
          <Button
            className='w-4 h-4 p-0 hover:bg-transparent'
            variant='ghost'
            onClick={toggleActions}
          >
            <X className='w-4 h-4' />
          </Button>
        </div>
        <p className='text-sm text-muted-foreground'>{t('actions.desc')}</p>
      </div>
      <div className='grid gap-2'>
        {ACTIONS.map((action) => {
          return (
            <div
              key={action.type}
              className='flex items-center gap-2 relative  rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground  cursor-grab'
              onDragStart={(e) => handleDragStart(e, action.type)}
              draggable
            >
              {action.Icon()}
              <span>{actionToLabel[action.type]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Actions
