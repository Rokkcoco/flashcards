import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from 'react'

import { InferType } from '@/common'

import s from './typography.module.scss'

type Props<T extends ElementType> = {
  as?: T
  text?: string
  variant?:
    | 'body_1'
    | 'body_2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'label'
    | 'large'
    | 'link_1'
    | 'link_2'
    | 'overline'
    | 'subtitle_1'
    | 'subtitle_2'
}

export type TypographyProps<T extends ElementType = 'p'> = Props<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>

//todo сделать зависимость as к variant, чтобы по умолчанию уже было
const Typography = forwardRef(
  <T extends ElementType = 'p'>(
    props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
    ref: ForwardedRef<InferType<T>>
  ) => {
    const {
      as: Component = 'p',
      children,
      className,

      text = '',
      variant = 'body_1',
      ...rest
    } = props

    return (
      <Component className={`${s.typography} ${s[variant]} ${className}`} ref={ref} {...rest}>
        {children ?? text}
      </Component>
    )
  }
)

export default Typography as <T extends ElementType = 'p'>(
  props: TypographyProps<T> & {
    ref?: ForwardedRef<ElementRef<T>>
  }
) => ReactElement

Typography.displayName = 'Typography'
