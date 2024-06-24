import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & {
      required?: boolean
      help?: string
    }
>(({ className, ...props }, ref) => (
  <div className='space-x-1'>
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className, {
        'after:content-["*"] after:text-destructive after:ml-1 after:inline-block':
          props.required,
      })}
      {...props}
    />
    {props.help && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className='w-3 h-3 text-muted-foreground' />
          </TooltipTrigger>
          <TooltipContent className='max-w-80' side='right'>
            <p className='text-xs whitespace-pre-line'>{props.help}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
