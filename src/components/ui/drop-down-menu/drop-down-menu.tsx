import { ComponentPropsWithoutRef, ElementRef, ReactElement, forwardRef } from 'react'

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
  items: { content: ReactElement | string }[]
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>
export const DropdownMenu = forwardRef<ElementRef<typeof DropdownMenuRadix.Root>, Props>(
  (props, ref) => {
    const { items, ...rest } = props

    return (
      <DropdownMenuRadix.Root {...rest}>
        <DropdownMenuRadix.Trigger></DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content className={s.content} ref={ref}>
            {items.map((t, index) => {
              if (index === items.length - 1) {
                return <DropdownItem>{t.content}</DropdownItem>
              } else {
                return (
                  <>
                    <DropdownItem>{t.content}</DropdownItem>
                    <DropdownMenuRadix.Separator className={s.separator} />
                  </>
                )
              }
            })}
            <DropdownMenuRadix.Arrow className={s.arrow} />
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    )
  }
)
