import { cn } from '@/lib/utils'
import { Bot, Loader2 } from 'lucide-react'

type PageLoadingProps = {
  className?: string
}

const PageLoading = ({ className }: PageLoadingProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center h-svh bg-white',
        className,
      )}
    >
      <div className='flex flex-col gap-2 items-center'>
        <Bot size={56} className='text-primary' />
        <Loader2 className='text-primary animate-spin' size={24} />
      </div>
    </div>
  )
}

export default PageLoading
