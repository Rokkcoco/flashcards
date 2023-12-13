import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ as: Component = 'div', className, ...rest }, ref) => {
    const classNames = {
      root: clsx(s.root, className),
    }

    return <Component className={classNames.root} ref={ref} {...rest} />
  }
)
