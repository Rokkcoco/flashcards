import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './drop-down-menu.module.scss'

type DropdownLabelProps = Omit<ComponentPropsWithoutRef<typeof DropdownMenuRadix.Label>, 'onChange'>
export const DropdownLabel = forwardRef<
  ElementRef<typeof DropdownMenuRadix.Label>,
  DropdownLabelProps
>((props, ref) => {
  const { children, className, ...rest } = props

  const classNames = {
    item: clsx(s.label, className),
  }

  return (
    <DropdownMenuRadix.Label className={classNames.item} ref={ref} {...rest}>
      {children}
    </DropdownMenuRadix.Label>
  )
})
DropdownLabel.displayName = 'DropdownLabel'

type DropdownItemProps = Omit<ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>, 'onChange'>

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenuRadix.Item>,
  DropdownItemProps
>((props, ref) => {
  const { children, className, ...rest } = props

  const classNames = {
    item: clsx(s.item, className),
  }

  return (
    <DropdownMenuRadix.Item className={classNames.item} ref={ref} {...rest}>
      {children}
    </DropdownMenuRadix.Item>
  )
})
DropdownItem.displayName = 'DropdownItem'

type DropdownSeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuRadix.Separator>,
  'onChange'
>
export const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenuRadix.Separator>,
  DropdownSeparatorProps
>((props, ref) => {
  const { className, ...rest } = props

  const classNames = {
    item: clsx(s.separator, className),
  }

  return <DropdownMenuRadix.Separator className={classNames.item} ref={ref} {...rest} />
})
DropdownSeparator.displayName = 'DropdownSeparator'

type Props = {
  align?: 'center' | 'end' | 'start'
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root> &
  Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>
export const DropdownMenu = forwardRef<ElementRef<typeof DropdownMenuRadix.Content>, Props>(
  (props, ref) => {
    const { align = 'end', children, className, trigger, ...rest } = props

    const classNames = {
      arrow: s.arrow,
      content: clsx(s.content, className),
      trigger: s.trigger,
    }

    return (
      <DropdownMenuRadix.Root>
        <DropdownMenuRadix.Trigger asChild className={classNames.trigger}>
          {trigger}
        </DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content
            align={align}
            className={classNames.content}
            ref={ref}
            {...rest}
          >
            {children}
            <DropdownMenuRadix.Arrow className={classNames.arrow} />
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    )
  }
)
DropdownMenu.displayName = 'DropdownMenu'
