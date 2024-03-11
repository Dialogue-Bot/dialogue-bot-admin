/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes } from 'react'

type UnorderedListProps = HtmlHTMLAttributes<HTMLUListElement>
type OrderedListProps = HtmlHTMLAttributes<HTMLOListElement>

export const UnOrderList = ({
  className,
  children,
  ...props
}: UnorderedListProps) => {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  )
}

export const OrderedList = ({
  className,
  children,
  ...props
}: OrderedListProps) => {
  return (
    <ol
      className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
      {...props}
    >
      {children}
    </ol>
  )
}
