import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from 'react'

import { InferType } from '@/common'

import s from './button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

const Button = forwardRef(
  <T extends ElementType = 'button'>(
    props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: ForwardedRef<InferType<T>>
  ) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

    return (
      <Component
        className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        ref={ref}
        {...rest}
      />
    )
  }
)

export default Button as <T extends ElementType = 'button'>(
  props: Props<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof Props<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReactElement
