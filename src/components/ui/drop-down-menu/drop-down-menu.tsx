import {
  ComponentPropsWithoutRef,
  ElementRef,
  Fragment,
  ReactNode,
  forwardRef,
  isValidElement,
} from 'react'

import { Avatar } from '@/components/ui/avatar'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './drop-down-menu.module.scss'

type DropdownItemProps = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>
const DropdownItem = forwardRef<ElementRef<typeof DropdownMenuRadix.Item>, DropdownItemProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <DropdownMenuRadix.Item {...rest} className={s.item} ref={ref}>
        {children}
      </DropdownMenuRadix.Item>
    )
  }
)

type Props = {
  alt?: string
  items: { content: ReactNode }[]
  src?: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>
export const DropdownMenu = forwardRef<ElementRef<typeof DropdownMenuRadix.Root>, Props>(
  (props, ref) => {
    const { alt, items, src, trigger, ...rest } = props

    return (
      <DropdownMenuRadix.Root {...rest}>
        <DropdownMenuRadix.Trigger>
          <Avatar alt={alt} src={src}>
            {trigger}
          </Avatar>
        </DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content className={s.content} ref={ref}>
            {items.map((t, index) => {
              console.log(t.content)
              if (isValidElement(t.content)) {
                if (
                  t.content.props &&
                  t.content.props.children[index].type.__docgenInfo.displayName === 'Avatar'
                ) {
                  console.log('yes')
                }
              }

              return (
                <Fragment key={index}>
                  <DropdownItem key={index}>{t.content}</DropdownItem>
                  {index === items.length - 1 ? null : (
                    <DropdownMenuRadix.Separator className={s.separator} />
                  )}
                </Fragment>
              )
            })}
            <DropdownMenuRadix.Arrow className={s.arrow} />
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    )
  }
)
