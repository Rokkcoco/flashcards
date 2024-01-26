import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphicRef } from '@/common'
import { clsx } from 'clsx'

import s from './button.module.scss'

type Props<T extends ElementType> = {
  as?: T
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
}

type ButtonProps<T extends ElementType> = Props<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof Props<T>> & { ref?: PolymorphicRef<T> }

type ButtonComponent = <T extends ElementType = 'button'>(props: ButtonProps<T>) => ReactNode

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: ElementRef<T>) => {
    const { as, className, fullWidth, variant = 'primary', ...rest } = props

    const classNames = {
      button: clsx(s.button, s[variant], fullWidth && s.fullWidth, className),
    }

    const Component = as || 'button'

    return <Component className={classNames.button} ref={ref} {...rest} />
  }
)
