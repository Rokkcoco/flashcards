import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './drop-down-menu.module.scss'

type DropdownItemProps = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenuRadix.Item>,
  DropdownItemProps
>((props, ref) => {
  const { children, className, ...rest } = props

  const classNames = {
    item: clsx(s.item, className),
  }

  return (
    <DropdownMenuRadix.Item {...rest} className={classNames.item} ref={ref}>
      {children}
    </DropdownMenuRadix.Item>
  )
})

type DropdownSeparatorProps = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Separator>
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

type Props = {
  align?: 'center' | 'end' | 'start'
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Content>
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
            className={classNames.content}
            {...rest}
            align={align}
            ref={ref}
          >
            {children}
            <DropdownMenuRadix.Arrow className={classNames.arrow} />
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    )
  }
)
