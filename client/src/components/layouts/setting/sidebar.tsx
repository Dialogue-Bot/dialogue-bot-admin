import { cn } from '@/lib/utils'
import { CircleUserRound, Mails } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  {
    name: 'Profiles',
    to: '/settings/profiles',
    i18n: 'profiles',
    Icon: CircleUserRound,
  },
  {
    name: 'Mail',
    to: '/settings/mail',
    i18n: 'mail',
    Icon: Mails,
  },
] as const

const Sidebar = () => {
  const { t } = useTranslation('common')
  return (
    <div className='min-h-svh w-sidebar-setting flex-shrink-0 bg-neutral-100 fixed bottom-0 left-sidebar top-header '>
      <ul className='space-y-1 py-4'>
        {SIDEBAR_ITEMS.map((item: any) => {
          const Icon = item.Icon
          return (
            <li key={item.i18n}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-4 py-2 gap-2 transition-all hover:bg-primary/5 ',
                    { 'bg-primary/5 font-medium': isActive },
                  )
                }
              >
                <Icon className='w-5 h-5' />
                <span>{t(item.i18n)}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
