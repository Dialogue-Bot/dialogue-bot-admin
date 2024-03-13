import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { useUserStore } from '@/store/use-user'
import {
  Bot,
  BrainCircuit,
  Cable,
  MessageSquareCode,
  Settings,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const SIDEBAR_ITEMS: Array<{
  Icon: JSX.Element
  i18n: string
  to: string
}> = [
  {
    Icon: (
      <MessageSquareCode className='w-5 h-5 text-white group-hover:opacity-85 transition-all' />
    ),
    i18n: 'chatbots',
    to: '/chatbots',
  },
  {
    Icon: (
      <BrainCircuit className='w-5 h-5 text-white group-hover:opacity-85 transition-all' />
    ),
    i18n: 'training',
    to: '/chatbots',
  },
  {
    Icon: (
      <Cable className='w-5 h-5 text-white group-hover:opacity-85 transition-all' />
    ),
    i18n: 'channels',
    to: '/channels',
  },
]

const Sidebar = () => {
  const { t } = useTranslation('common')
  const { user } = useUserStore()

  return (
    <aside className='w-sidebar bg-stone-800 min-h-svh flex flex-col fixed left-0 top-0 bottom-0'>
      <Link
        className='bg-primary w-sidebar h-sidebar flex items-center justify-center'
        to='/dashboard'
      >
        <Bot size={32} className='text-white' />
      </Link>
      <nav className='flex flex-col flex-1'>
        <ul className='flex flex-col'>
          {SIDEBAR_ITEMS.map((item, index) => (
            <TooltipProvider key={item.i18n + index}>
              <Tooltip>
                <TooltipTrigger>
                  <li className='h-12 w-full flex items-center justify-center group'>
                    <Link
                      to={item.to}
                      className='w-full h-full flex items-center justify-center'
                    >
                      {item.Icon}
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p>{t(item.i18n as any)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ul>

        <div className='mt-auto'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='h-12 w-full flex items-center justify-center group'>
                <Link
                  to='/settings'
                  className='w-full h-full flex items-center justify-center'
                >
                  <Settings className='w-5 h-5 text-white group-hover:opacity-85 transition-all' />
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p>{t('settings')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className='flex items-center justify-center  cursor-pointer w-sidebar h-sidebar'>
            <Avatar className='w-9 h-9'>
              <AvatarImage src={user?.avatar as string} alt={user?.name} />
              <AvatarFallback>
                <span>{user?.name?.[0]}</span>
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
