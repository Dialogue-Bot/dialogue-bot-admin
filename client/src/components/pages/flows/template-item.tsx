import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  buttonVariants,
} from '@/components/ui'
import { API_URL } from '@/constants'
import { queryChannelForTestTemplateOption } from '@/lib/query-options'
import { cn } from '@/lib/utils'
import { TFLow } from '@/types/flow'
import { useQuery } from '@tanstack/react-query'
import { ChatBox } from 'dialogue-chatbox'
import { useTranslation } from 'react-i18next'

const MAP_TEMPLATE_IMAGE: Record<string, any> = {
  'Shopping Online': {
    image:
      'https://firebasestorage.googleapis.com/v0/b/dialoguebot-6674e.appspot.com/o/%2F%2Ftemplates%2Fz5614514806068_e48f634d30742961a3fc7675d818b320.jpg?alt=media&token=6c3d4127-a02e-4e67-86a0-bd86568cfa62',
    description: 'template_descriptions.shopping',
    icon: '🛒',
  },
  'Apply Job': {
    image:
      'https://firebasestorage.googleapis.com/v0/b/dialoguebot-6674e.appspot.com/o/%2F%2Ftemplates%2Fz5614514806068_e48f634d30742961a3fc7675d818b320.jpg?alt=media&token=6c3d4127-a02e-4e67-86a0-bd86568cfa62',
    description: 'template_descriptions.job_application',
    icon: '👩‍💼',
  },
}

type Props = {
  flow: Pick<TFLow, 'id' | 'name' | 'publishAt'>
}

export const TemplateItem = ({ flow }: Props) => {
  const { t } = useTranslation(['flows', 'common'])
  const { data: channel } = useQuery(
    queryChannelForTestTemplateOption(flow.id as string),
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative w-full h-full flex min-h-48 cursor-pointer'>
          <div
            className={buttonVariants({
              variant: 'outline',
              className: cn(
                '!p-4 !h-[unset] hover:border-primary hover:ring-primary hover:ring-1 flex-1 !items-start !justify-end flex-col',
              ),
            })}
          >
            <span className='text-3xl mb-2'>
              {MAP_TEMPLATE_IMAGE[flow.name].icon}
            </span>
            <h3 className='whitespace-pre-line break-all'>{flow.name}</h3>
            <span className='text-sm text-muted-foreground font-normal whitespace-pre-line  break-all'>
              {t(MAP_TEMPLATE_IMAGE[flow.name].description)}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='lg:max-w-4xl max-w-full'>
        <DialogHeader>
          <DialogTitle>
            {t('title_template')} {flow.name}
          </DialogTitle>
        </DialogHeader>
        <div
          className='flex items-end justify-between border border-input'
          style={{
            backgroundImage: `url(${MAP_TEMPLATE_IMAGE[flow.name].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Button className='mb-4'>{t('common:try_it_out')}</Button>
          <div
            className={cn(
              'rounded-md shadow w-80 transition-transform duration-300 flex flex-col gap-4 bg-white h-[500px] overflow-hidden',
            )}
          >
            <ChatBox
              channelId={channel?.contactId as string}
              className='h-full w-full'
              isTest
              isShowClose={false}
              API_URL={API_URL}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
