import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
} from 'react'

import { InferType } from '@/common'

import s from './typography.module.scss'

export type Variant =
  | 'body_1'
  | 'body_2'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'large'
  | 'link_1'
  | 'link_2'
  | 'overline'
  | 'subtitle_1'
  | 'subtitle_2'

type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  text?: string
  variant?: Variant
} & ComponentPropsWithoutRef<T>

export const Typography = forwardRef<InferType<TypographyProps>, TypographyProps>(
  <T extends ElementType = 'p'>(
    {
      as,
      children,
      style,
      text = '',
      variant = 'body_1',
      ...restProps
    }: PropsWithChildren<TypographyProps<T>>,
    ref: ForwardedRef<InferType<T>>
  ) => {
    const Component = as || 'p'
    const className = `${s.typography}, ${s[variant]}`

    return (
      <Component className={className} style={style} {...restProps} ref={ref}>
        {children || text}
      </Component>
    )
  }
)
