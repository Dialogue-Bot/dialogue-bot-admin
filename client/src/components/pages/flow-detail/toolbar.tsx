import {
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { useUpdateFlow } from '@/hooks/flow'
import { usePublishFlow } from '@/hooks/flow/use-publish-flow'
import { useDidUpdate } from '@/hooks/use-did-update'
import { Settings2, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { useFlowCtx } from '.'
import Setting from './setting'

export const Toolbar = () => {
  const {
    toggleActions,
    openActions,
    setShowTestBot,
    showTestBot,
    handleAutoLayout,
  } = useFlowCtx()
  const { t } = useTranslation('flowDetail')
  const { flow, edges, nodes, getCompleteFlows } = useFlowCtx()
  const { id } = useParams()

  const [value] = useDebounceValue(nodes, 5000)

  const updateFlowMutation = useUpdateFlow()
  const publishFlowMutation = usePublishFlow()
  const autoSaveFlowMutation = useUpdateFlow({ isShowToastSuccess: false })

  const handleSave = async () => {
    await updateFlowMutation.mutateAsync({
      id: id as string,
      data: {
        edges,
        nodes,
        flows: getCompleteFlows(),
        name: flow.name,
      },
    })
  }

  useDidUpdate(() => {
    autoSaveFlowMutation.mutate({
      id: id as string,
      data: {
        edges,
        nodes,
        flows: getCompleteFlows(),
        name: flow.name,
      },
    })
  }, [value])

  return (
    <div className='fixed top-4 right-4 z-50' id='flow-toolbar'>
      <div className='flex h-12 items-center bg-card shadow px-2 select-none gap-2 rounded-md w-full'>
        <div className='flex items-center gap-2 w-full'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => {
                    toggleActions()
                    setShowTestBot(false)
                  }}
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
          <Button
            variant='ghost'
            onClick={() => {
              setShowTestBot((prev) => !prev)

              if (openActions) {
                toggleActions()
              }
            }}
          >
            {t(!showTestBot ? 'toolbar.test_your_bot' : 'toolbar.close_test')}
          </Button>
          <Button variant='secondary' onClick={handleAutoLayout}>
            {t('toolbar.auto_layout')}
          </Button>
          <Button
            variant='secondary'
            onClick={handleSave}
            loading={
              updateFlowMutation.isPending || autoSaveFlowMutation.isPending
            }
          >
            {t('toolbar.save')}
          </Button>
          <Button
            variant='default'
            className='w-full'
            onClick={() => publishFlowMutation.mutate({ id: id as string })}
            loading={publishFlowMutation.isPending}
            disabled={Boolean(flow.publishAt)}
          >
            {t('toolbar.publish')}
          </Button>
        </div>
      </div>
    </div>
  )
}
