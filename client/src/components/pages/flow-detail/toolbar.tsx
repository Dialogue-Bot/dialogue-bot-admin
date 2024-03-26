import {
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { Settings2, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '.'
import Setting from './setting'

export const Toolbar = () => {
  const { toggleActions } = useFlowCtx()
  const { t } = useTranslation('flowDetail')
  return (
    <div className='fixed top-4 right-4 z-50 w-80' id='flow-toolbar'>
      <div className='flex h-12 items-center bg-card shadow px-2 select-none gap-2 rounded-md w-full'>
        <div className='flex items-center gap-2 w-full'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={toggleActions}
                  className='flex-shrink-0'
                >
                  <Zap className='w-4 h-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>{t('toolbar.actions')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <Setting>
                <TooltipTrigger>
                  <Button size='icon' variant='ghost' className='flex-shrink-0'>
                    <Settings2 className='w-4 h-4' />
                  </Button>
                </TooltipTrigger>
              </Setting>
              <TooltipContent sideOffset={10}>
                <p>{t('toolbar.settings')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator
            orientation='vertical'
            className='self-stretch h-[unset]'
          />
          <Button variant='ghost'>{t('toolbar.test_your_bot')}</Button>
          <Button variant='default' className='w-full'>
            {t('toolbar.publish')}
          </Button>
        </div>
      </div>
    </div>
  )
}
