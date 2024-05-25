import { cn } from '@/lib/utils'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui'

export const ScrollTop = () => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsShow(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Button
      className={cn(
        'fixed right-4 bottom-[72px] w-10 h-10 p-0 transition-all',
        {
          'opacity-0 invisible translate-y-10': !isShow,
          'opacity-100 visible translate-y-0': isShow,
        },
      )}
      variant='outline'
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <ChevronUp className='w-5 h-5 flex-shrink-0' />
    </Button>
  )
}
