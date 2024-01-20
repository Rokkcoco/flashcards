import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

type Props = {
  alt?: string
  size: 'large' | 'small'
  src?: string
} & ComponentPropsWithoutRef<typeof AvatarRadix.Root> &
  ComponentPropsWithoutRef<'img'>

export const Avatar = forwardRef<ElementRef<typeof AvatarRadix.Root>, Props>((props, ref) => {
  const { alt, children, className, size, src, ...rest } = props
  const classNames = {
    fallback: s.fallback,
    image: s.image,
    root: clsx(s.root, size === 'small' && s.small, size === 'large' && s.large, className),
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
