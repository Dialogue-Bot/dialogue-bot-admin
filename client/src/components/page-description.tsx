import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export const PageDescription = ({ children, className }: Props) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  )
}

export default PageDescription
