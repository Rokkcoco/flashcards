import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

type Props = {
  alt: string
  src: string
} & ComponentPropsWithoutRef<typeof AvatarRadix.Root> &
  ComponentPropsWithoutRef<'img'>

export const Avatar = forwardRef<ElementRef<typeof AvatarRadix.Root>, Props>((props, ref) => {
  const { alt, children, className, src, ...rest } = props
  const classNames = {
    fallback: s.fallback,
    image: s.image,
    root: clsx(s.root, className),
  }

  return (
    <AvatarRadix.Root className={classNames.root} ref={ref} {...rest}>
      {src && alt && <AvatarRadix.Image alt={alt} className={classNames.image} src={src} />}
      <AvatarRadix.Fallback className={classNames.fallback} delayMs={500}>
        {children}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
})

Avatar.displayName = 'Avatar'
