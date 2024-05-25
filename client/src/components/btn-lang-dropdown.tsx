import { lngs } from '@/i18n'
import { ELang } from '@/types/share'
import { useTranslation } from 'react-i18next'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui'

export const ButtonLangDropdown = () => {
  const { i18n } = useTranslation()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='min-w-24 max-w-24'>
          {lngs[i18n.language as ELang]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(lngs).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => {
              i18n.changeLanguage(lang)
            }}
          >
            {lngs[lang as ELang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
