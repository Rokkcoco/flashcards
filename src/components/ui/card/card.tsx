import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from 'react'

import { InferType } from '@/common'
import { clsx } from 'clsx'

import s from './card.module.scss'

type Props<T extends ElementType> = {
  as?: T
}

export type CardProps<T extends ElementType = 'div'> = Props<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>

const Card = forwardRef(
  <T extends ElementType = 'div'>(
    props: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>,
    ref: ForwardedRef<InferType<T>>
  ) => {
    const { as: Component = 'div', className, ...rest } = props

    const classNames = {
      root: clsx(s.root, className),
    }

    return <Component className={classNames.root} ref={ref} {...rest} />
  }
)

export default Card as <T extends ElementType = 'div'>(
  props: CardProps<T> & {
    ref?: ForwardedRef<ElementRef<T>>
  }
) => ReactElement

Card.displayName = 'Card'
