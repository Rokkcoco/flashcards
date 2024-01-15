import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import Typography from '@/components/ui/typography/typography'
import * as TooltipRadix from '@radix-ui/react-tooltip'
import { clsx } from 'clsx'

import s from './tooltip.module.scss'
type Props = {
  content: ReactNode
} & ComponentPropsWithoutRef<typeof TooltipRadix.Root> &
  ComponentPropsWithoutRef<'div'>
export const Tooltip = forwardRef<ElementRef<typeof TooltipRadix.Content>, Props>((props, ref) => {
  const { children, className, content, defaultOpen, onOpenChange, open, ...rest } = props

  const classNames = {
    content: clsx(s.content, className),
  }

  return (
    <TooltipRadix.Provider delayDuration={800} skipDelayDuration={500}>
      <TooltipRadix.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
        <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
        <TooltipRadix.Content
          align={'center'}
          className={classNames.content}
          ref={ref}
          side={'bottom'}
          {...rest}
        >
          <Typography variant={'caption'}>{content}</Typography>
          <TooltipRadix.Arrow fill={'#808080'} height={5} width={10} />
        </TooltipRadix.Content>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  )
})
