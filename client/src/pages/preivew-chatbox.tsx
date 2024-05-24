import { Button } from '@/components/ui'
import { queryCustomChatBoxOptions } from '@/lib/query-options/custom-chatbox'
import { useQuery } from '@tanstack/react-query'
import { ChatBox } from 'dialogue-chatbox'
import { Bot, X } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const PreviewChatBox = () => {
  const [searchParams] = useSearchParams()
  const { data: customs } = useQuery(
    queryCustomChatBoxOptions(searchParams.get('contactId') as string),
  )
  const [open, setOpen] = useState(false)

  useDocumentTitle('Preview Chatbox')

  return (
    <div className='flex items-center justify-center min-h-svh'>
      <span className='text-lg '>
        Your chatbox preview will be displayed here
      </span>
      <div
        className='absolute z-[100]'
        style={{
          bottom: customs?.position.y,
          right: customs?.position.x,
          width: customs?.buttonSize,
          height: customs?.buttonSize,
        }}
      >
        {open ? (
          <ChatBox
            isForPreview
            channelId={searchParams.get('contactId') as string}
            customStyles={{
              buttonSize: customs?.buttonSize as number,
              color: customs?.color as string,
              position: customs?.position as { x: number; y: number },
              windowSize: {
                width: customs?.windowSize.width || 320,
                height: customs?.windowSize.height || 500,
              },
              logoUrl: customs?.logoUrl,
              name: customs?.name,
            }}
            className='absolute bottom-[calc(100%_+_10px)] right-0 bg-white rounded-md overflow-hidden'
            onClose={() => {
              setOpen(false)
            }}
          />
        ) : null}

        <Button
          className='fixed'
          style={{
            bottom: customs?.position.y,
            right: customs?.position.x,
            width: customs?.buttonSize,
            height: customs?.buttonSize,
            backgroundColor: customs?.color,
          }}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <X className='w-6 h-6 flex-shrink-0' />
          ) : (
            <Bot className='w-6 h-6 flex-shrink-0' />
          )}
        </Button>
      </div>
    </div>
  )
}

export default PreviewChatBox
