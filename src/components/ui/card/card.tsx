import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphicRef } from '@/common'
import { clsx } from 'clsx'

import s from './card.module.scss'

type Props<T extends ElementType> = {
  as?: T
}

type CardProps<T extends ElementType> = Props<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof Props<T>> & { ref?: PolymorphicRef<T> }

type CardComponent = <T extends ElementType = 'div'>(props: CardProps<T>) => ReactNode

export const Card: CardComponent = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: ElementRef<T>) => {
    const { as, className, ...rest } = props

    const classNames = {
      root: clsx(s.root, className),
    }

    const Component = as || 'div'

    return <Component className={classNames.root} ref={ref} {...rest} />
  }
)
