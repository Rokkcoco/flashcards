import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Avatar } from '@/components/ui/avatar'
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
  alt?: string
  src?: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root> &
  ComponentPropsWithoutRef<'div'>
export const DropdownMenu = forwardRef<ElementRef<typeof DropdownMenuRadix.Content>, Props>(
  (props, ref) => {
    const { alt, children, className, src, trigger, ...rest } = props

    const classNames = {
      content: clsx(s.content, className),
    }

    // items: { content: ReactNode }[]
    /*  if (isValidElement(t.content) && t.content.props !== undefined) {
          if (t.content.props.children[index].type.__docgenInfo.displayName === 'Avatar') {
              console.log('yes')
          }
      }*/
    return (
      <DropdownMenuRadix.Root {...rest}>
        <DropdownMenuRadix.Trigger>
          <Avatar alt={alt} src={src}>
            {trigger}
          </Avatar>
        </DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content className={classNames.content} ref={ref}>
            {children}
            <DropdownMenuRadix.Arrow className={s.arrow} />
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    )
  }
)
