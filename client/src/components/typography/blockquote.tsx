/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes } from 'react'

type Props = HtmlHTMLAttributes<HTMLQuoteElement>

export const TypographyBlockquote = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export default TypographyBlockquote
