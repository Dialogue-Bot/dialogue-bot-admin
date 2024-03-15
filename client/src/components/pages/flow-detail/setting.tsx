import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'
import { Dialog } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GeneralSetting from './general-setting'

const useSettingOptions = () => {
  const { t } = useTranslation()

  return [
    {
      label: 'General',
      value: 'general',
      Content: GeneralSetting,
    },
    {
      label: 'Variables',
      value: 'variables',
      Content: null,
    },
  ]
}

type Props = {
  children: React.ReactNode
}

const Setting = ({ children }: Props) => {
  const settingOptions = useSettingOptions()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-xl min-h-[40rem] max-h-[40rem] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your chatbot below.</DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue={settingOptions[0].value}
          orientation='vertical'
          className='flex-1 flex flex-col'
        >
          <TabsList className='justify-start w-max'>
            {settingOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {settingOptions.map((option) => {
            const Content = option.Content

            return (
              <TabsContent
                key={option.value}
                value={option.value}
                className='flex-1 flex'
              >
                {Content && <Content onClose={() => setOpen(false)} />}
              </TabsContent>
            )
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default Setting
