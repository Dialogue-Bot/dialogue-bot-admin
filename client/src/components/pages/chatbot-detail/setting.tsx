import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  MultipleSelect,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'
import { Dialog } from '@radix-ui/react-dialog'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Setting = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-5xl min-h-[40rem] max-h-[40rem] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your chatbot below.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue='account' orientation='vertical' className='flex-1'>
          <TabsList>
            <TabsTrigger value='account'>General</TabsTrigger>
            <TabsTrigger value='password'>Variables</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <MultipleSelect
              options={[
                {
                  label: '1',
                  value: '1',
                },
                {
                  label: '2',
                  value: '2',
                },
              ]}
              values={['1']}
              onChange={(value) => {
                console.log(value)
              }}
              placeholder='Select channels'
            />
          </TabsContent>
          <TabsContent value='password'></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default Setting
