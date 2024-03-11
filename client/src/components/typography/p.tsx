/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes } from 'react'

type Props = HtmlHTMLAttributes<HTMLParagraphElement>

export const TypographyP = ({ className, children, ...props }: Props) => {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export default TypographyP
