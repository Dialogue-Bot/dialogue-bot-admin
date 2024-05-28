import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.ImgHTMLAttributes<HTMLImageElement>

export const Img = (props: Props) => {
  return (
    <img
      {...props}
      className={cn(
        'rounded-md w-full mx-auto shadow-md my-6',
        props.className,
      )}
    />
  )
}
