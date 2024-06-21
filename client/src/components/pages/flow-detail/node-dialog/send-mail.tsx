import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichEditor,
} from '@/components/ui'
import { TBotSendMail, useBotSendMailSchema } from '@/lib/schema/bot-send-mail'
import { zodResolver } from '@hookform/resolvers/zod'
import { cloneDeep } from 'lodash'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '..'

export const SendMailContent = () => {
  const { handleChangeSelectedNode, selectedNode } = useFlowCtx()

  const schema = useBotSendMailSchema()
  const form = useForm<TBotSendMail>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      subject: selectedNode?.data.sendMail?.subject || '',
      to: selectedNode?.data.sendMail?.to || '',
      body: selectedNode?.data.sendMail?.body || '',
    },
  })

  const { t } = useTranslation(['forms', 'common'])

  function decodeHTMLEntities(text: string) {
    const textArea = document.createElement('textarea')

    textArea.innerHTML = text

    const decodedText = textArea.value

    textArea.remove()

    console.log({
      'before decode': text,
      'after decode': decodedText,
    })

    return decodedText
  }

  const handleSubmit = (data: TBotSendMail) => {
    if (!selectedNode) return

    const html = document.createElement('div')
    html.classList.add('prose')

    const tiptap = document.querySelector('.tiptap.ProseMirror')

    if (tiptap) {
      html.appendChild(tiptap.cloneNode(true))
    }

    const clonedNode = cloneDeep(selectedNode)

    clonedNode.data.sendMail = {
      subject: data.subject,
      to: data.to,
      body: decodeHTMLEntities(html.outerHTML),
    }

    handleChangeSelectedNode(clonedNode)
  }

  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('subject.label')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('subject.placeholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='to'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('mail_to.label')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('mail_to.placeholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('mail_body.label')}</FormLabel>
                <FormControl>
                  <RichEditor onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <div className='flex items-center justify-end'>
          <Button>{t('common:save')}</Button>
        </div>
      </form>
    </Form>
  )
}

export default SendMailContent
