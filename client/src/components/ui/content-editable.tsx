import { cn } from '@/lib/utils'
import ReactContentEditable, { Props } from 'react-contenteditable'

const ContentEditable = ({ className, ...props }: Omit<Props, 'ref'>) => {
  return (
    <ReactContentEditable
      {...props}
      className={cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    />
  )
}

export { ContentEditable }
