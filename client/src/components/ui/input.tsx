import * as React from 'react'

import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [inputType, setInputType] = React.useState(type)
    if (type === 'password') {
      return (
        <div className='relative'>
          <input
            type={inputType}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-7',
              className,
            )}
            ref={ref}
            {...props}
          />
          {showPassword ? (
            <Eye
              className='w-4 h-4 absolute right-3 cursor-pointer  top-1/2 transform -translate-y-1/2'
              onClick={() => {
                setShowPassword(!showPassword)
                setInputType(showPassword ? 'password' : 'text')
              }}
            />
          ) : (
            <EyeOff
              className='w-4 h-4  absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2'
              onClick={() => {
                setShowPassword(!showPassword)
                setInputType(showPassword ? 'password' : 'text')
              }}
            />
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
