import { lngs } from '@/i18n'
import { cn } from '@/lib/utils'
import { ELang } from '@/types/share'
import { useTranslation } from 'react-i18next'
import { Button } from './ui'

type Props = {
  className?: string
}

export const ButtonLang = ({ className }: Props) => {
  const { i18n } = useTranslation()

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={() => {
        i18n.changeLanguage(i18n.language === ELang.EN ? ELang.VI : ELang.EN)
      }}
      className={cn('min-w-24', className)}
    >
      {lngs[i18n.language as ELang]}
    </Button>
  )
}

export default ButtonLang
