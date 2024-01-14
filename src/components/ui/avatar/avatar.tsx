import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'

import s from 'avatar.module.scss'

type Props = {} & ComponentPropsWithoutRef<typeof AvatarRadix.Root>

export const Avatar = forwardRef<ElementRef<typeof AvatarRadix.Root>, Props>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AvatarRadix.Root asChild className={s.root} ref={ref} {...rest}>
      <AvatarRadix.Fallback className={s.fallback}>CT</AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
})
