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

type Props<T extends ElementType = 'p'> = {
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
} & ComponentPropsWithoutRef<T>
//todo
const Typography = forwardRef(
  <T extends ElementType = 'p'>(
    props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: ForwardedRef<InferType<T>>
  ) => {
    const {
      as: Component = 'p',
      children,
      className,
      style,
      text = '',
      variant = 'body_1',
      ...rest
    } = props

    return (
      <Component
        className={`${s.typography} ${s[variant]} ${className}`}
        ref={ref}
        style={style}
        {...rest}
      >
        {children || text}
      </Component>
    )
  }
)

export default Typography as <T extends ElementType = 'p'>(
  props: Props<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof Props<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReactElement
