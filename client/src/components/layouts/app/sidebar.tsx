import PageLoading from '@/components/page-loading'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Confirm,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { ROUTES } from '@/constants'
import { useLogout } from '@/hooks/auth'
import { useCreateBillingPortalSession } from '@/hooks/subscription'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/use-user'
import {
  Bot,
  BrainCircuit,
  Cable,
  HelpCircle,
  LogOut,
  MessageCircle,
  MessageSquareCode,
  Rss,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

const SIDEBAR_ITEMS: Array<{
  Icon: JSX.Element
  i18n: string
  to: string
}> = [
  {
    Icon: (
      <MessageSquareCode className='w-5 h-5 group-hover:opacity-85 transition-all' />
    ),
    i18n: 'flows',
    to: ROUTES.PRIVATE.FLOW.INDEX,
  },
  {
    Icon: (
      <BrainCircuit className='w-5 h-5 group-hover:opacity-85 transition-all' />
    ),
    i18n: 'training',
    to: ROUTES.PRIVATE.TRAINING.INDEX,
  },
  {
    Icon: <Cable className='w-5 h-5 group-hover:opacity-85 transition-all' />,
    i18n: 'channels',
    to: ROUTES.PRIVATE.CHANNEL.INDEX,
  },
  {
    Icon: (
      <MessageCircle className='w-5 h-5 group-hover:opacity-85 transition-all' />
    ),
    i18n: 'conversations',
    to: ROUTES.PRIVATE.CONVERSATION.INDEX,
  },
]

const Sidebar = () => {
  const { t } = useTranslation(['common', 'layout'])
  const { user } = useUserStore()

  const logoutMutation = useLogout()

  const createBillingPortalSessionMutation = useCreateBillingPortalSession()

  return (
    <>
      {createBillingPortalSessionMutation.isPending && (
        <PageLoading className='fixed inset-0 z-[1000] backdrop-blur-sm bg-transparent' />
      )}
      <aside className='w-sidebar bg-stone-800 min-h-svh flex flex-col fixed left-0 top-0 bottom-0 z-50'>
        <Link
          className='bg-primary w-sidebar h-sidebar flex items-center justify-center'
          to={ROUTES.PRIVATE.DASHBOARD}
        >
          <Bot size={32} className='text-white' />
        </Link>
        <nav className='flex flex-col flex-1'>
          <div className='flex flex-col'>
            {SIDEBAR_ITEMS.map((item, index) => (
              <TooltipProvider key={item.i18n + index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className='h-12 w-full flex items-center justify-center group'>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            'w-full h-full flex items-center justify-center text-white',
                            {
                              'text-primary': isActive,
                            },
                          )
                        }
                      >
                        {item.Icon}
                      </NavLink>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>{t(item.i18n as any)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className='mt-auto'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='h-12 w-full flex items-center justify-center group'>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        'w-full h-full flex items-center justify-center text-white',
                        {
                          'text-primary': isActive,
                        },
                      )
                    }
                    to={ROUTES.PUBLIC.HELP}
                    target='_blank'
                  >
                    <HelpCircle className='w-5 h-5 ' />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p>{t('help')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='h-12 w-full flex items-center justify-center group'>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        'w-full h-full flex items-center justify-center text-white',
                        {
                          'text-primary': isActive,
                        },
                      )
                    }
                    to={ROUTES.PRIVATE.USER_SUBSCRIPTION.INDEX}
                  >
                    <Rss className='w-5 h-5 ' />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p>{t('subscription')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className='flex items-center justify-center  cursor-pointer w-sidebar h-sidebar'>
              <Link
                to={ROUTES.PRIVATE.SETTING.PROFILES}
                className='flex items-center justify-center'
              >
                <Avatar className='w-9 h-9 '>
                  <AvatarImage src={user?.avatar as string} alt={user?.name} />
                  <AvatarFallback>
                    <span>{user?.name?.[0]}</span>
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='h-12 w-full flex items-center justify-center group'>
                  <Confirm
                    title={t('layout:app_layout.logout.title')}
                    description={t('layout:app_layout.logout.description')}
                    onConfirm={() => {
                      logoutMutation.mutate()
                    }}
                  >
                    <div
                      className='w-full h-full flex items-center justify-center'
                      // onClick={() => logoutMutation.mutate()}
                    >
                      <LogOut className='w-5 h-5 text-white group-hover:opacity-85 transition-all' />
                    </div>
                  </Confirm>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p>{t('logout')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
