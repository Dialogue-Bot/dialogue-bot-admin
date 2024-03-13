/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes } from 'react'

type Props = HtmlHTMLAttributes<HTMLHeadingElement>

export const H1 = ({ className, children, ...props }: Props) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export default H1
