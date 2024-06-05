import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from './input'
import InputImage from './input-image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

type InputImageFileOrUrlProps = {
  value: string
  onChange: (value: string) => void
  defaultValue?: string
}

export const InputImageFileOrUrl = ({
  value,
  onChange,
  defaultValue,
}: InputImageFileOrUrlProps) => {
  const { t } = useTranslation(['forms'])
  const [type, setType] = useState<'file' | 'url'>('file')

  return (
    <Tabs
      defaultValue='file'
      onValueChange={(value) => {
        setType(value as 'file' | 'url')
      }}
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='file'>File</TabsTrigger>
        <TabsTrigger value='url' onClick={() => setType('url')}>
          Url
        </TabsTrigger>
      </TabsList>
      <TabsContent value='file'>
        <InputImage
          value={value}
          onChange={onChange}
          toServer
          disabled={type === 'url'}
        />
      </TabsContent>
      <TabsContent value='url'>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('forms:url.placeholder')}
          defaultValue={defaultValue}
          disabled={type === 'file'}
        />
      </TabsContent>
    </Tabs>
  )
}
