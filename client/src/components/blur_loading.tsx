import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type BlurLoadingProps = {
  className?: string
}

const BlurLoading = ({ className }: BlurLoadingProps) => {
  return (
    <div
      className={cn(
        'flex  justify-center h-svh bg-white bg-opacity-90 z-[1000] fixed top-0 left-0 w-full overflow-hidden flex-col gap-2 items-center backdrop-filter backdrop-blur-sm',
        className,
      )}
    >
      <div className='flex flex-col gap-2 items-center'>
        <Loader2 className='text-primary animate-spin' size={24} />
      </div>
    </div>
  )
}

export default BlurLoading
